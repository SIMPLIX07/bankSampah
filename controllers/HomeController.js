exports.index = (req, res) => {
    res.render('homeSampah');
};

exports.komunitas = (req, res) => {
    res.render('komunitas');
};

exports.berita = (req, res) => {
    res.render('berita');
};

exports.landing = (req, res) => {
    res.render('landing', { activePage: 'landing' });
};

exports.aboutUs = (req, res) => {
    res.render('aboutUs', { activePage: 'about' });
};

exports.contact = (req, res) => {
    res.render('contact', { activePage: 'contact' });
};

exports.settings = (req, res) => {
    res.render('settings', { activePage: 'settings' });
};

exports.settingsAccount = (req, res) => {
    res.render('settingsAccount', { activePage: 'settings' });
};

exports.settingsProfile = (req, res) => {
    res.render('settingsProfile', { activePage: 'settings' });
};

exports.settingsSecurity = (req, res) => {
    res.render('settingsSecurity', { activePage: 'settings' });
};

exports.depositSampah = (req, res) => {
    res.render('depositSampah', { activePage: 'deposit' });
};

exports.exchangePoints = (req, res) => {
    res.render('exchangePoints', { activePage: 'exchange' });
};

exports.withdrawMoney = (req, res) => {
    res.render('withdrawMoney', { activePage: 'withdraw' });
};
