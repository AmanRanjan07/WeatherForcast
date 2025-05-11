import React, { useState } from 'react';
import '../styles/Forecast.css';

function Forecast() {
  const [location, setLocation] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dummyForecast = [
    {
      day: 'Today',
      temp: '24°C',
      condition: 'Sunny',
      icon: 'sun',
      wind: '12 km/h',
      humidity: '65%',
      precipitation: '0%',
      uv: 'High',
      tags: ['Clear Sky', 'Hot', 'UV Warning']
    },
    {
      day: 'Tomorrow',
      temp: '22°C',
      condition: 'Partly Cloudy',
      icon: 'cloud-sun',
      wind: '15 km/h',
      humidity: '70%',
      precipitation: '20%',
      uv: 'Moderate',
      tags: ['Mixed Weather', 'Mild', 'Good Air Quality']
    },
    {
      day: 'Wednesday',
      temp: '20°C',
      condition: 'Rain',
      icon: 'cloud-rain',
      wind: '20 km/h',
      humidity: '80%',
      precipitation: '75%',
      uv: 'Low',
      tags: ['Heavy Rain', 'Windy', 'Umbrella Needed']
    },
    {
      day: 'Thursday',
      temp: '21°C',
      condition: 'Cloudy',
      icon: 'cloud',
      wind: '18 km/h',
      humidity: '75%',
      precipitation: '35%',
      uv: 'Low',
      tags: ['Overcast', 'Mild', 'Light Breeze']
    },
    {
      day: 'Friday',
      temp: '23°C',
      condition: 'Clear',
      icon: 'sun',
      wind: '10 km/h',
      humidity: '60%',
      precipitation: '5%',
      uv: 'High',
      tags: ['Clear Sky', 'Warm', 'Perfect Day']
    }
  ];

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case 'sun':
        return (
          <div className="weather-icon sun-container">
            <i className="fas fa-sun main-icon"></i>
            <div className="sun-rays"></div>
          </div>
        );
      case 'cloud-sun':
        return (
          <div className="weather-icon partly-cloudy-container">
            <i className="fas fa-sun main-icon"></i>
            <i className="fas fa-cloud secondary-icon"></i>
          </div>
        );
      case 'cloud-rain':
        return (
          <div className="weather-icon rain-container">
            <i className="fas fa-cloud main-icon"></i>
            <div className="rain-drops">
              <i className="fas fa-tint"></i>
              <i className="fas fa-tint"></i>
              <i className="fas fa-tint"></i>
            </div>
          </div>
        );
      case 'cloud':
        return (
          <div className="weather-icon cloud-container">
            <i className="fas fa-cloud main-icon"></i>
            <i className="fas fa-cloud secondary-icon"></i>
          </div>
        );
      default:
        return <i className="fas fa-sun main-icon"></i>;
    }
  };

  const getWeatherIndicator = (type, value) => {
    const indicators = {
      wind: { icon: 'fas fa-wind', label: 'Wind' },
      humidity: { icon: 'fas fa-tint', label: 'Humidity' },
      precipitation: { icon: 'fas fa-cloud-rain', label: 'Rain Chance' },
      uv: { icon: 'fas fa-sun', label: 'UV Index' }
    };

    return (
      <div className="weather-indicator">
        <i className={indicators[type].icon}></i>
        <span className="indicator-label">{indicators[type].label}</span>
        <span className="indicator-value">{value}</span>
      </div>
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate API call with dummy data
    setTimeout(() => {
      setForecastData(dummyForecast);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="forecast-container">
      <div className="search-section">
        <h1>5-Day Weather Forecast</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city name..."
              className="search-input"
            />
          </div>
          <button type="submit" className="search-button">
            <i className="fas fa-location-arrow"></i>
            Get Forecast
          </button>
        </form>
      </div>

      <div className="forecast-content">
        {loading && (
          <div className="loading-container">
            <div className="loading-animation">
              <i className="fas fa-cloud-sun"></i>
              <i className="fas fa-cloud"></i>
              <i className="fas fa-cloud-rain"></i>
            </div>
            <p>Loading forecast data...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
          </div>
        )}

        {forecastData && (
          <div className="forecast-grid">
            {forecastData.map((day, index) => (
              <div key={index} className="forecast-card">
                <div className="forecast-icon">
                  {getWeatherIcon(day.icon)}
                </div>
                <h3 className="forecast-day">{day.day}</h3>
                <p className="forecast-temp">{day.temp}</p>
                <p className="forecast-condition">{day.condition}</p>
                
                <div className="weather-tags">
                  {day.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="weather-tag">{tag}</span>
                  ))}
                </div>

                <div className="weather-indicators">
                  {getWeatherIndicator('wind', day.wind)}
                  {getWeatherIndicator('humidity', day.humidity)}
                  {getWeatherIndicator('precipitation', day.precipitation)}
                  {getWeatherIndicator('uv', day.uv)}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && !forecastData && (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-cloud-sun main-icon"></i>
              <i className="fas fa-search search-icon"></i>
            </div>
            <p>Enter a location to see the weather forecast</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forecast; 