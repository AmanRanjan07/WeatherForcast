const User = require('../models/User');
const axios = require('axios');

// Get current weather for a city
exports.getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a city name'
      });
    }

    // Here you would call your weather API
    // This is just a placeholder response
    const weatherData = {
      city,
      temperature: 25,
      condition: 'Sunny',
      humidity: 60,
      windSpeed: 10
    };

    res.json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    console.error('Weather data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weather data'
    });
  }
};

// Save a location for the user
exports.saveLocation = async (req, res) => {
  try {
    const { city, country, coordinates } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if location already exists
    const locationExists = user.savedLocations.some(
      loc => loc.city === city && loc.country === country
    );

    if (locationExists) {
      return res.status(400).json({
        success: false,
        message: 'Location already saved'
      });
    }

    // Add new location
    user.savedLocations.push({
      city,
      country,
      coordinates
    });

    await user.save();

    res.json({
      success: true,
      message: 'Location saved successfully',
      data: user.savedLocations
    });
  } catch (error) {
    console.error('Save location error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving location'
    });
  }
};

// Get user's saved locations
exports.getSavedLocations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('savedLocations');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.savedLocations
    });
  } catch (error) {
    console.error('Get saved locations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching saved locations'
    });
  }
}; 