import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Spin } from 'antd';
import { MapPin, Cloud, Thermometer, Droplets, Wind } from 'lucide-react';
import config from '../config/config';
import '../styles/MapComponent.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '20px',
};

const MapComponent = ({ center, weatherData, onMapClick }) => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loadingError, setLoadingError] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.api.googleMapsApiKey,
    libraries: config.map.libraries,
  });

  useEffect(() => {
    if (!config.api.googleMapsApiKey) {
      setLoadingError('Google Maps API key is missing. Please check your environment variables.');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation(config.map.defaultCenter);
        }
      );
    } else {
      setCurrentLocation(config.map.defaultCenter);
    }
  }, []);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const location = { lat, lng };
    setSelectedLocation(location);
    if (onMapClick) {
      onMapClick(location);
    }
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  if (loadError) {
    return (
      <div className="map-error">
        <p>Error loading maps</p>
        <p>Please check your internet connection and try again.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="map-loading">
        <Spin size="large" />
      </div>
    );
  }

  const mapCenter = center || currentLocation || config.map.defaultCenter;

  return (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
          styles: [
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9e9e9" }],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#f2f2f2" }],
            },
          ],
        }}
      >
        {mapCenter && (
          <Marker
            position={mapCenter}
            onClick={() => handleMarkerClick(mapCenter)}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        )}

        {selectedLocation && weatherData && (
          <InfoWindow
            position={selectedLocation}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="weather-info-window">
              <h3>Weather Information</h3>
              <div className="weather-details">
                <p><Cloud className="weather-icon" /> {weatherData.description || 'Loading...'}</p>
                <p><Thermometer className="weather-icon" /> Temperature: {weatherData.temperature || '--'}°C</p>
                <p><Droplets className="weather-icon" /> Humidity: {weatherData.humidity || '--'}%</p>
                <p><Wind className="weather-icon" /> Wind: {weatherData.windSpeed || '--'} km/h</p>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;