import axios from 'axios';
import config from '../config/config';

// Create axios instance with default config
const api = axios.create({
  baseURL: config.api.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(config.auth.tokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // Signup function
  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      if (response.data.token) {
        localStorage.setItem(config.auth.tokenKey, response.data.token);
        localStorage.setItem(config.auth.userKey, JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during signup' };
    }
  },

  // Login function
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem(config.auth.tokenKey, response.data.token);
        localStorage.setItem(config.auth.userKey, JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during login' };
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem(config.auth.tokenKey);
    localStorage.removeItem(config.auth.userKey);
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem(config.auth.userKey);
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(config.auth.tokenKey);
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem(config.auth.tokenKey);
  }
}; 