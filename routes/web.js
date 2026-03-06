const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.index);
router.get('/komunitas', HomeController.komunitas);
router.get('/berita', HomeController.berita);

module.exports = router;