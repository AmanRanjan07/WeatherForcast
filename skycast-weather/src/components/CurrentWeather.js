import React from 'react';
import { Row, Col } from 'antd';
import '../styles/CurrentWeather.css';

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData) return null;

  const getWeatherIcon = (type) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Drizzle': '🌦️',
      'Mist': '🌫️'
    };
    return icons[type] || '🌤️';
  };

  return (
    <div className="current-weather-container">
      <div className="city-name">
        {weatherData.city}
      </div>

      <div className="main-weather-info">
        <div className="weather-icon-large">
          {getWeatherIcon(weatherData.type)}
        </div>
        <div className="temperature-display">
          <span className="temperature">{Math.round(weatherData.temperature)}°C</span>
          <span className="weather-condition">{weatherData.description}</span>
        </div>
      </div>

      <div className="weather-details-grid">
        <div className="detail-box">
          <div className="detail-label">Feels Like</div>
          <div className="detail-value">{Math.round(weatherData.feelsLike)}°C</div>
        </div>

        <div className="detail-box">
          <div className="detail-label">Humidity</div>
          <div className="detail-value">{weatherData.humidity}%</div>
        </div>

        <div className="detail-box">
          <div className="detail-label">Wind Speed</div>
          <div className="detail-value">{weatherData.windSpeed} km/h</div>
        </div>

        <div className="detail-box">
          <div className="detail-label">Pressure</div>
          <div className="detail-value">{weatherData.pressure} hPa</div>
        </div>

        <div className="detail-box">
          <div className="detail-label">Sunrise</div>
          <div className="detail-value">{weatherData.sunrise || 'N/A'}</div>
        </div>

        <div className="detail-box">
          <div className="detail-label">Sunset</div>
          <div className="detail-value">{weatherData.sunset || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather; 