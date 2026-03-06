const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.landing);
router.get('/dashboard', HomeController.index);
router.get('/komunitas', HomeController.komunitas);
router.get('/berita', HomeController.berita);
router.get('/about', HomeController.aboutUs);
router.get('/contact', HomeController.contact);
router.get('/settings', HomeController.settings);
router.get('/settings/account', HomeController.settingsAccount);
router.get('/settings/profile', HomeController.settingsProfile);
router.get('/settings/security', HomeController.settingsSecurity);

module.exports = router;
