import axios from 'axios';
import apiConfig from '../config/api';

const { baseURL, endpoints, defaultParams, handleApiError } = apiConfig;

// Create axios instance with default config
const weatherApi = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
weatherApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

const weatherService = {
  fetchWeather: async (location) => {
    try {
      const response = await weatherApi.get(endpoints.current, {
        params: {
          ...defaultParams,
          q: location,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchWeatherByCoordinates: async (lat, lon) => {
    try {
      const response = await weatherApi.get(endpoints.current, {
        params: {
          ...defaultParams,
          q: `${lat},${lon}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchForecast: async (location, days = 5) => {
    try {
      const response = await weatherApi.get(endpoints.forecast, {
        params: {
          ...defaultParams,
          q: location,
          days,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchLocations: async (query) => {
    try {
      const response = await weatherApi.get(endpoints.search, {
        params: {
          ...defaultParams,
          q: query,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchAirQuality: async (location) => {
    try {
      const response = await weatherApi.get(endpoints.current, {
        params: {
          ...defaultParams,
          q: location,
          aqi: 'yes',
        },
      });
      return response.data.current.air_quality;
    } catch (error) {
      throw error;
    }
  },

  fetchAlerts: async (location) => {
    try {
      const response = await weatherApi.get(endpoints.current, {
        params: {
          ...defaultParams,
          q: location,
          alerts: 'yes',
        },
      });
      return response.data.alerts || [];
    } catch (error) {
      throw error;
    }
  },
};

export default weatherService;
