const express = require('express');
const path    = require('path');
const fs      = require('fs');
const multer  = require('multer');
const app     = express();

const webRoutes = require('./routes/web');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// ── MULTER: profile photo upload ──
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'public/uploads/avatars')),
    filename:    (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, 'profile' + ext);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (req, file, cb) => {
        const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, allowed.includes(ext));
    }
});

// ── AVATAR STORE (persists across restarts via JSON) ──
const AVATAR_STORE = path.join(__dirname, 'data', 'profile.json');
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
if (!fs.existsSync(AVATAR_STORE)) fs.writeFileSync(AVATAR_STORE, JSON.stringify({ avatarUrl: null }));

// Make avatarUrl available to every view
app.use((req, res, next) => {
    try {
        const data = JSON.parse(fs.readFileSync(AVATAR_STORE, 'utf8'));
        res.locals.avatarUrl = data.avatarUrl || null;
    } catch { res.locals.avatarUrl = null; }
    next();
});

// ── UPLOAD ROUTE ──
app.post('/settings/profile/photo', upload.single('photo'), (req, res) => {
    if (req.file) {
        const url = '/uploads/avatars/' + req.file.filename + '?v=' + Date.now();
        fs.writeFileSync(AVATAR_STORE, JSON.stringify({ avatarUrl: url }));
    }
    res.redirect('/settings/profile');
});

// ── DELETE ROUTE ──
app.post('/settings/profile/photo/delete', (req, res) => {
    const avatarsDir = path.join(__dirname, 'public/uploads/avatars');
    fs.readdirSync(avatarsDir).forEach(f => fs.unlinkSync(path.join(avatarsDir, f)));
    fs.writeFileSync(AVATAR_STORE, JSON.stringify({ avatarUrl: null }));
    res.redirect('/settings/profile');
});

app.use('/', webRoutes);

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});