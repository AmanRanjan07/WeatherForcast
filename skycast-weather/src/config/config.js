const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    weatherApiKey: process.env.REACT_APP_WEATHER_API_KEY,
    weatherApiBaseUrl: 'https://api.weatherapi.com/v1',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  },

  // Default Map Configuration
  map: {
    defaultCenter: {
      lat: 20.5937,
      lng: 78.9629 // Center of India
    },
    defaultZoom: 5,
    libraries: ['places']
  },

  // Authentication Configuration
  auth: {
    tokenKey: 'token',
    userKey: 'user'
  }
};

export default config; 