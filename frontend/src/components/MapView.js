
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
function LocationMarker({ onLocationChange }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationChange({ lat, lng });
    },
  });
  return null;
}

function MapView({ weather, onLocationSelect }) {
  const position = weather ? [weather.coord.lat, weather.coord.lon] : [20, 77];
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        dragging={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <LocationMarker onLocationChange={onLocationSelect} />

        {weather && weather.main && (
          <Marker position={position}>
            <Popup>
              {weather.name || "Unknown"} <br />
              Temp: {weather.main.temp}°C <br />
              Humidity: {weather.main.humidity}% <br />
              {/* Optionally add AQI info here if available */}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;











