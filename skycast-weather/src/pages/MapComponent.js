import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { defaultMapConfig } from "../config/maps";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "600px",
  borderRadius: "15px",
};

function MapComponent({ onMapClick, selectedLocation }) {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [marker, setMarker] = useState(selectedLocation);
  const [loadError, setLoadError] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (selectedLocation) {
      setMarker(selectedLocation);
      if (map) {
        map.panTo(selectedLocation);
        map.setZoom(12);
      }
    }
  }, [selectedLocation, map]);

  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onAutocompleteLoad = useCallback((autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      
      if (!place.geometry || !place.geometry.location) {
        console.error("No location data for this place");
        return;
      }

      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      setMarker(location);
      map.panTo(location);
      map.setZoom(12);
      onMapClick(location);

      // Update search input with formatted address
      setSearchInput(place.formatted_address || place.name);
    }
  }, [autocomplete, map, onMapClick]);

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const location = { lat, lng };
    setMarker(location);
    onMapClick(location);

    // Get address for clicked location
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        setSearchInput(results[0].formatted_address);
      }
    });
  }, [onMapClick]);

  const handleLoadError = useCallback((error) => {
    console.error('Error loading Google Maps:', error);
    setLoadError(true);
  }, []);

  if (loadError) {
    return (
      <div className="map-error">
        <p>Error loading maps. Please check your internet connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="map-container">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        onError={handleLoadError}
      >
        <div className="map-search-box">
          <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Search for a location..."
              className="map-search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Autocomplete>
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={marker || defaultMapConfig.center}
          zoom={marker ? 12 : defaultMapConfig.zoom}
          options={defaultMapConfig.options}
          onClick={handleMapClick}
          onLoad={onMapLoad}
        >
          {marker && (
            <Marker
              position={marker}
              animation={2}
              title="Selected Location"
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(MapComponent);
