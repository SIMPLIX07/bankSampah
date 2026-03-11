/**
 * Script untuk mengkonversi views EJS ke static HTML
 * Jalankan: node generate-html.js
 */

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, 'html');
const cssOutputDir = path.join(outputDir, 'css');

// Buat folder output
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(cssOutputDir)) fs.mkdirSync(cssOutputDir, { recursive: true });

// Copy layout.css
fs.copyFileSync(
    path.join(__dirname, 'public', 'css', 'layout.css'),
    path.join(cssOutputDir, 'layout.css')
);
console.log('Copied: css/layout.css');

const pages = [
    { file: 'landing.ejs',          output: 'index.html',            data: { activePage: 'home' } },
    { file: 'homeSampah.ejs',        output: 'dashboard.html',        data: { activePage: 'dashboard' } },
    { file: 'aboutUs.ejs',           output: 'about.html',            data: { activePage: 'about' } },
    { file: 'contact.ejs',           output: 'contact.html',          data: { activePage: 'contact' } },
    { file: 'berita.ejs',            output: 'berita.html',           data: { activePage: 'berita' } },
    { file: 'komunitas.ejs',         output: 'komunitas.html',        data: { activePage: 'komunitas' } },
    { file: 'settings.ejs',          output: 'settings.html',         data: { activePage: 'settings' } },
    { file: 'settingsAccount.ejs',   output: 'settings-account.html', data: { activePage: 'settings' } },
    { file: 'settingsProfile.ejs',   output: 'settings-profile.html', data: { activePage: 'settings' } },
    { file: 'settingsSecurity.ejs',  output: 'settings-security.html',data: { activePage: 'settings' } },
];

function fixUrls(html) {
    return html
        // CSS path
        .replace(/href="\/css\/layout\.css"/g, 'href="css/layout.css"')
        // Settings sub-routes (harus sebelum /settings agar tidak ter-replace duluan)
        .replace(/href="\/settings\/account"/g, 'href="settings-account.html"')
        .replace(/href="\/settings\/profile"/g, 'href="settings-profile.html"')
        .replace(/href="\/settings\/security"/g, 'href="settings-security.html"')
        .replace(/href="\/settings"/g, 'href="settings.html"')
        // Main routes
        .replace(/href="\/dashboard"/g, 'href="dashboard.html"')
        .replace(/href="\/komunitas"/g, 'href="komunitas.html"')
        .replace(/href="\/berita"/g, 'href="berita.html"')
        .replace(/href="\/about"/g, 'href="about.html"')
        .replace(/href="\/contact"/g, 'href="contact.html"')
        // Root (harus paling akhir agar tidak overwrite yang sudah diubah)
        .replace(/href="\/"/g, 'href="index.html"')
        // Anchor hash di root: href="/#section" -> href="index.html#section"
        .replace(/href="\/#/g, 'href="index.html#');
}

let generated = 0;
pages.forEach(page => {
    const filePath = path.join(viewsDir, page.file);
    ejs.renderFile(filePath, page.data, { views: [viewsDir] }, (err, html) => {
        if (err) {
            console.error(`ERROR rendering ${page.file}:`, err.message);
            return;
        }
        const fixed = fixUrls(html);
        const outPath = path.join(outputDir, page.output);
        fs.writeFileSync(outPath, fixed, 'utf-8');
        console.log(`Generated: ${page.output}`);
        generated++;
        if (generated === pages.length) {
            console.log(`\nSelesai! ${generated} file HTML berhasil dibuat di folder 'html/'`);
        }
    });
});
