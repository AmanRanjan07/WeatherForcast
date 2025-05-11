const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getCurrentWeather,
  saveLocation,
  getSavedLocations
} = require('../controllers/weatherController');

// Get current weather for a city
router.get('/current', protect, getCurrentWeather);

// Save a location
router.post('/save-location', protect, saveLocation);

// Get user's saved locations
router.get('/saved-locations', protect, getSavedLocations);

module.exports = router; 