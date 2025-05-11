import axios from 'axios';
import config from '../config/config';

const weatherService = {
  async getCurrentWeather(lat, lon) {
    try {
      const response = await axios.get(`${config.api.weatherApiBaseUrl}/forecast.json`, {
        params: {
          key: config.api.weatherApiKey,
          q: `${lat},${lon}`,
          days: 1
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch current weather data');
    }
  },

  async getForecast(lat, lon) {
    try {
      const response = await axios.get(`${config.api.weatherApiBaseUrl}/forecast.json`, {
        params: {
          key: config.api.weatherApiKey,
          q: `${lat},${lon}`,
          days: 5
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch forecast data');
    }
  },

  async getLocationByName(cityName, countryCode = '') {
    try {
      const query = countryCode ? `${cityName},${countryCode}` : cityName;
      const response = await axios.get(`${config.api.weatherApiBaseUrl}/search.json`, {
        params: {
          key: config.api.weatherApiKey,
          q: query
        }
      });
      
      if (response.data.length === 0) {
        throw new Error('Location not found');
      }
      
      return {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
        name: response.data[0].name,
        country: response.data[0].country
      };
    } catch (error) {
      throw new Error('Failed to fetch location data');
    }
  },

  processWeatherData(data) {
    const astro = data.forecast && data.forecast.forecastday && data.forecast.forecastday[0] && data.forecast.forecastday[0].astro;
    return {
      city: data.location.name,
      temperature: Math.round(data.current.temp_c),
      feelsLike: Math.round(data.current.feelslike_c),
      humidity: data.current.humidity,
      windSpeed: Math.round(data.current.wind_kph),
      description: data.current.condition.text,
      type: data.current.condition.text,
      icon: data.current.condition.icon,
      pressure: data.current.pressure_mb,
      sunrise: astro ? astro.sunrise : 'N/A',
      sunset: astro ? astro.sunset : 'N/A',
      position: {
        lat: data.location.lat,
        lng: data.location.lon
      }
    };
  },

  processForecastData(data) {
    return data.forecast.forecastday.map(day => ({
      date: new Date(day.date).getTime(),
      temp_max: day.day.maxtemp_c,
      temp_min: day.day.mintemp_c,
      type: day.day.condition.text,
      description: day.day.condition.text,
      humidity: day.day.avghumidity,
      wind_speed: day.day.maxwind_kph,
      icon: day.day.condition.icon
    }));
  }
};

export default weatherService; 