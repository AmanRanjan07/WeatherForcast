// Ensure API key is available and valid
const validateApiKey = () => {
  const apiKey = 'AIzaSyCC2JTKVpU22uThYAStFqLasm0c01B5Hxw';
  if (!apiKey) {
    console.error('Google Maps API key is missing');
    return false;
  }
  return true;
};

// Export API key with validation
export const GOOGLE_MAPS_API_KEY = 'AIzaSyCC2JTKVpU22uThYAStFqLasm0c01B5Hxw';

export const defaultMapConfig = {
  center: {
    lat: 20.5937,
    lng: 78.9629, // Center of India as default
  },
  zoom: 5,
  options: {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: true,
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
  },
};

export const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "12px",
  position: "relative",
  overflow: "hidden",
}; 