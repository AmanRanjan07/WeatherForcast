const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const authLimiter = require('../middleware/rateLimiter');

// Signup route
router.post('/signup', signup);

// Login route with rate limiting
router.post('/login', authLimiter, login);

module.exports = router; 