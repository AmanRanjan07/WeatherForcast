// API Configuration
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';

// Validate environment variables
const validateConfig = () => {
  const errors = [];
  
  if (!WEATHER_API_KEY) {
    errors.push('WeatherAPI.com API key is not configured. Please set REACT_APP_WEATHER_API_KEY in your .env file.');
  }

  if (!GOOGLE_MAPS_API_KEY) {
    errors.push('Google Maps API key is not configured. Please set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file.');
  }

  if (errors.length > 0) {
    console.error('Configuration Errors:', errors);
    return false;
  }

  return true;
};

// API endpoints
const endpoints = {
  current: '/current.json',
  forecast: '/forecast.json',
  search: '/search.json',
};

// Default parameters for API requests
const defaultParams = {
  key: WEATHER_API_KEY,
  aqi: 'yes',  // Include air quality data
  alerts: 'yes' // Include weather alerts
};

// Error handling
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 401:
        throw new Error('Invalid API key. Please check your WeatherAPI key configuration.');
      case 403:
        throw new Error('API access denied. Please check your API key permissions.');
      case 404:
        throw new Error('Location not found. Please try a different location.');
      case 429:
        throw new Error('API rate limit exceeded. Please try again later.');
      default:
        throw new Error(data?.error?.message || 'An error occurred while fetching weather data.');
    }
  }
  throw new Error('Network error. Please check your internet connection.');
};

// API configuration object
const apiConfig = {
  weatherApiKey: WEATHER_API_KEY,
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  baseURL: WEATHER_API_BASE_URL,
  endpoints,
  defaultParams,
  validateConfig,
  handleApiError
};

export default apiConfig; 