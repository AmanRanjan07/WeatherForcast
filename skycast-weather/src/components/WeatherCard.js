import React from 'react';
import { Spin, Alert } from 'antd';
import '../styles/WeatherCard.css';

const WeatherCard = ({ weather, loading, error }) => {
  if (loading) {
    return (
      <div className="weather-card loading">
        <Spin size="large" />
        <p>Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card error">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!weather || !weather.current || !weather.location) {
    return (
      <div className="weather-card placeholder">
        <Alert
          message="No Weather Data"
          description="Please search for a location or click on the map to get weather information."
          type="info"
          showIcon
        />
      </div>
    );
  }

  const { current, location } = weather;

  const getWeatherIcon = (code, isDay) => {
    // Map weather codes to Font Awesome icons
    const iconMap = {
      1000: isDay ? 'sun' : 'moon', // Clear
      1003: isDay ? 'cloud-sun' : 'cloud-moon', // Partly cloudy
      1006: 'cloud', // Cloudy
      1009: 'cloud', // Overcast
      1030: 'smog', // Mist
      1063: 'cloud-rain', // Patchy rain
      1066: 'snowflake', // Patchy snow
      1069: 'cloud-sleet', // Patchy sleet
      1072: 'cloud-rain', // Patchy freezing drizzle
      1087: 'bolt', // Thundery outbreaks
      1114: 'snowflake', // Blowing snow
      1117: 'snowflake', // Blizzard
      1135: 'smog', // Fog
      1147: 'smog', // Freezing fog
      1150: 'cloud-rain', // Patchy light drizzle
      1153: 'cloud-rain', // Light drizzle
      1180: 'cloud-rain', // Patchy light rain
      1183: 'cloud-rain', // Light rain
      1186: 'cloud-showers-heavy', // Moderate rain at times
      1189: 'cloud-showers-heavy', // Moderate rain
      1192: 'cloud-showers-heavy', // Heavy rain at times
      1195: 'cloud-showers-heavy', // Heavy rain
      1198: 'cloud-rain', // Light freezing rain
      1201: 'cloud-rain', // Moderate or heavy freezing rain
      1204: 'cloud-sleet', // Light sleet
      1207: 'cloud-sleet', // Moderate or heavy sleet
      1210: 'snowflake', // Patchy light snow
      1213: 'snowflake', // Light snow
      1216: 'snowflake', // Patchy moderate snow
      1219: 'snowflake', // Moderate snow
      1222: 'snowflake', // Patchy heavy snow
      1225: 'snowflake', // Heavy snow
      1237: 'snowflake', // Ice pellets
      1240: 'cloud-rain', // Light rain shower
      1243: 'cloud-showers-heavy', // Moderate or heavy rain shower
      1246: 'cloud-showers-heavy', // Torrential rain shower
      1249: 'cloud-sleet', // Light sleet showers
      1252: 'cloud-sleet', // Moderate or heavy sleet showers
      1255: 'snowflake', // Light snow showers
      1258: 'snowflake', // Moderate or heavy snow showers
      1261: 'snowflake', // Light showers of ice pellets
      1264: 'snowflake', // Moderate or heavy showers of ice pellets
      1273: 'bolt', // Patchy light rain with thunder
      1276: 'bolt', // Moderate or heavy rain with thunder
      1279: 'bolt', // Patchy light snow with thunder
      1282: 'bolt', // Moderate or heavy snow with thunder
    };

    const iconName = iconMap[code] || 'question';
    return `fas fa-${iconName}`;
  };

  const formatTime = (time) => {
    if (!time) return '--:--';
    return new Date(time).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getUVIndexClass = (uv) => {
    if (uv <= 2) return 'low';
    if (uv <= 5) return 'moderate';
    if (uv <= 7) return 'high';
    if (uv <= 10) return 'very-high';
    return 'extreme';
  };

  const getWindDirection = (degree) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div className="location-info">
          <h2>{location.name}</h2>
          <div className="location-details">
            {location.region && <p className="region">{location.region}</p>}
            {location.country && <p className="country">{location.country}</p>}
            <p className="coordinates">
              {location.lat.toFixed(2)}°N, {location.lon.toFixed(2)}°E
            </p>
          </div>
        </div>
        <div className="weather-main">
          <i className={getWeatherIcon(current.condition.code, current.is_day)} />
          <div className="temperature">
            <span className="temp-value">{Math.round(current.temp_c)}°</span>
            <span className="temp-unit">C</span>
          </div>
        </div>
        <p className="weather-description">{current.condition.text}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <i className="fas fa-thermometer-half"></i>
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{Math.round(current.feelslike_c)}°C</span>
        </div>
        <div className="detail-item">
          <i className="fas fa-tint"></i>
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{current.humidity}%</span>
        </div>
        <div className="detail-item">
          <i className="fas fa-wind"></i>
          <span className="detail-label">Wind</span>
          <span className="detail-value">
            {Math.round(current.wind_kph)} km/h {getWindDirection(current.wind_degree)}
          </span>
        </div>
        <div className="detail-item">
          <i className="fas fa-compass"></i>
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{current.pressure_mb} hPa</span>
        </div>
      </div>

      <div className="additional-info">
        <div className="info-item">
          <i className={`fas fa-sun uv-index ${getUVIndexClass(current.uv)}`}></i>
          <span className="info-label">UV Index</span>
          <span className="info-value">{current.uv}</span>
        </div>
        <div className="info-item">
          <i className="fas fa-cloud"></i>
          <span className="info-label">Cloud Cover</span>
          <span className="info-value">{current.cloud}%</span>
        </div>
        <div className="info-item">
          <i className="fas fa-eye"></i>
          <span className="info-label">Visibility</span>
          <span className="info-value">{current.vis_km} km</span>
        </div>
      </div>

      {current.air_quality && (
        <div className="air-quality">
          <h3>Air Quality</h3>
          <div className="aqi-details">
            {current.air_quality.pm2_5 && (
              <div className="aqi-item">
                <span className="aqi-label">PM2.5</span>
                <span className="aqi-value">{Math.round(current.air_quality.pm2_5)}</span>
              </div>
            )}
            {current.air_quality.pm10 && (
              <div className="aqi-item">
                <span className="aqi-label">PM10</span>
                <span className="aqi-value">{Math.round(current.air_quality.pm10)}</span>
              </div>
            )}
            {current.air_quality.co && (
              <div className="aqi-item">
                <span className="aqi-label">CO</span>
                <span className="aqi-value">{Math.round(current.air_quality.co)}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="last-updated">
        Last updated: {formatTime(current.last_updated)}
      </div>
    </div>
  );
};

export default WeatherCard;
