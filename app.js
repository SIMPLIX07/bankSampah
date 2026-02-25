const express = require('express');
const app = express();

const webRoutes = require('./routes/web');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', webRoutes);

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});