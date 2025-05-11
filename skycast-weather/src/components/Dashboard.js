import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Compass,
  Cloud,
  Wind,
  Droplets,
  Thermometer,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Sunrise,
  Sunset,
  Gauge
} from 'lucide-react';
import MapComponent from './MapComponent';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ weatherData, onMapClick, onSearch }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const countries = ['India', 'USA', 'UK', 'China', 'Russia'];
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleMapClick = (location) => {
    setSelectedLocation(location);
    if (onMapClick) {
      onMapClick(location);
    }
  };

  const getWeatherIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'clear': return <Sun className="weather-icon text-yellow" />;
      case 'clouds': return <Cloud className="weather-icon text-blue" />;
      case 'rain': return <CloudRain className="weather-icon text-blue" />;
      case 'snow': return <CloudSnow className="weather-icon text-blue-light" />;
      case 'thunderstorm': return <CloudLightning className="weather-icon text-yellow" />;
      case 'drizzle': return <CloudDrizzle className="weather-icon text-blue-light" />;
      case 'mist': return <Cloud className="weather-icon text-gray" />;
      default: return <Sun className="weather-icon text-yellow" />;
    }
  };

  return (
    <div className="dashboard-hero-bg">
      <nav className="main-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <Sun className="brand-icon" />
            <span className="brand-name">SkyCast</span>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/dashboard" className="nav-link active">Dashboard</a>
            <a href="/forecast" className="nav-link">Forecast</a>
            <a href="/settings" className="nav-link">Settings</a>
          </div>
          <div className="nav-auth">
            <Button variant="ghost" className="login-btn">Login</Button>
            <Button className="signup-btn">Sign Up</Button>
          </div>
        </div>
      </nav>
      <main className="dashboard-main-content">
        {weatherData && (
          <div className="dashboard-flex fade-in">
            {/* Hero Weather Card */}
            <Card className="weather-card hero-weather-card">
              <div className="weather-bg-illustration" />
              <div className="weather-header-pro">
                <h2 className="city-name-pro">{weatherData.city}</h2>
                <div className="last-updated">Last updated: {new Date().toLocaleTimeString()}</div>
                <div className="weather-main-pro">
                  {getWeatherIcon(weatherData.description)}
                  <div className="temperature-pro">
                    <span className="temp-value-pro">{Math.round(weatherData.temperature)}°C</span>
                    <span className="weather-desc-pro">{weatherData.description}</span>
                  </div>
                </div>
              </div>
              <div className="weather-details-row-pro">
                <div className="pill-detail-item">
                  <Thermometer className="detail-icon-pro" />
                  <span>{Math.round(weatherData.feelsLike)}°C</span>
                  <span className="pill-label">Feels Like</span>
                </div>
                <div className="pill-detail-item">
                  <Droplets className="detail-icon-pro" />
                  <span>{weatherData.humidity}%</span>
                  <span className="pill-label">Humidity</span>
                </div>
                <div className="pill-detail-item">
                  <Wind className="detail-icon-pro" />
                  <span>{weatherData.windSpeed} km/h</span>
                  <span className="pill-label">Wind</span>
                </div>
                <div className="pill-detail-item">
                  <Gauge className="detail-icon-pro" />
                  <span>{weatherData.pressure} hPa</span>
                  <span className="pill-label">Pressure</span>
                </div>
              </div>
            </Card>
            {/* Map Section */}
            <div className="map-card-pro fade-in">
              <div className="map-title-pro">
                <MapPin className="map-pin-icon" /> 
                Location Map
                {selectedLocation && (
                  <span className="selected-location">
                    ({selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)})
                  </span>
                )}
              </div>
              <MapComponent 
                center={weatherData.position} 
                weatherData={weatherData}
                onMapClick={handleMapClick}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard; 