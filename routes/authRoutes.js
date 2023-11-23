const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLoggedIn } = require('../middleware/authentication');

router.post('/login', authController.login);
router.post('/logout', isLoggedIn, authController.logout);

module.exports = router;
