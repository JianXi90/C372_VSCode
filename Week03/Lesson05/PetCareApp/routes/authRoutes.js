const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../config/upload');

router.get('/signup', authController.showSignup);
router.post('/signup', upload.single('pet_image'), authController.signup);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/', authController.index);

module.exports = router;
