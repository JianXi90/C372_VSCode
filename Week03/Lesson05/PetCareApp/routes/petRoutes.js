const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const upload = require('../config/upload');
const { isLoggedIn } = require('../middleware/auth');

router.get('/pets/new', isLoggedIn, petController.showNewPetForm);
router.post('/pets', upload.single('pet_image'), isLoggedIn, petController.createPet);

module.exports = router;
