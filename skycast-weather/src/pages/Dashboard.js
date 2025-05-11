import React, { useState, useEffect } from 'react';
import { Input, Button, message, Spin } from 'antd';
import MapComponent from '../components/MapComponent';
import WeatherForecast from '../components/WeatherForecast';
import CurrentWeather from '../components/CurrentWeather';
import weatherService from '../services/weatherService';
import { GOOGLE_MAPS_API_KEY } from '../config/maps';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user's location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to India's coordinates if geolocation fails
          fetchWeatherData(20.5937, 78.9629);
          message.info('Using default location (India)');
        }
      );
    } else {
      // Default to India's coordinates if geolocation is not supported
      fetchWeatherData(20.5937, 78.9629);
      message.info('Using default location (India)');
    }
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      // Fetch current weather
      const weatherResponse = await weatherService.getCurrentWeather(lat, lon);
      const processedWeather = weatherService.processWeatherData(weatherResponse);
      setWeatherData(processedWeather);

      // Fetch forecast
      const forecastResponse = await weatherService.getForecast(lat, lon);
      const processedForecast = weatherService.processForecastData(forecastResponse);
      setForecast(processedForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      message.error(error.message || 'Failed to fetch weather data');
    }
    setLoading(false);
  };

  const handleSearch = async (value) => {
    if (!value.trim()) return;

    setLoading(true);
    try {
      const location = await weatherService.getLocationByName(value.trim());
      await fetchWeatherData(location.lat, location.lon);
    } catch (error) {
      console.error('Error searching location:', error);
      message.error(error.message || 'Failed to find location');
    }
    setLoading(false);
  };

  const handleMapClick = async (event) => {
    const { lat, lng } = event.latLng;
    await fetchWeatherData(lat(), lng());
  };

  return (
    <div className="dashboard-container">
      <div className="search-container">
        <Input.Search
          placeholder="Enter city name or click on the map..."
          enterButton={
            <Button type="primary" loading={loading}>
              Search
            </Button>
          }
          size="large"
          onSearch={handleSearch}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          disabled={loading}
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="weather-map-container">
            <div className="current-weather-container">
              {weatherData && <CurrentWeather weatherData={weatherData} />}
            </div>
            <div className="map-container">
              <MapComponent
                apiKey={GOOGLE_MAPS_API_KEY}
                onMapClick={handleMapClick}
                center={weatherData ? weatherData.position : { lat: 20.5937, lng: 78.9629 }}
              />
            </div>
          </div>

          {forecast.length > 0 && (
            <div className="forecast-container">
              <WeatherForecast forecast={forecast} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
