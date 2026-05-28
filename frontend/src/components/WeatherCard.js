
import React from "react";

function WeatherCard({ weather }) {
  if (!weather) return null;

  const cardStyle = {
    border: "1px solid #3b824d", 
    backgroundColor: "#f9fff9",
    padding: "16px 24px",
    borderRadius: "8px",
    maxWidth: "350px",
    margin: "20px auto",
    boxShadow: "0 3px 10px rgba(0, 128, 0, 0.1)",
    color: "#205423",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  };

  const headingStyle = {
    fontWeight: "700",
    fontSize: "1.8rem",
    marginBottom: "12px",
  };

  const textStyle = {
    fontSize: "1.1rem",
    margin: "6px 0",
  };

  return (
    <div className="weather-card" style={cardStyle}>
      <h2 style={headingStyle}>
        {weather.name}, {weather.sys.country}
      </h2>
      <p style={textStyle}>🌡️ Temp: {weather.main.temp}°C</p>
      <p style={textStyle}>💧 Humidity: {weather.main.humidity}%</p>
      <p style={textStyle}>🌬️ Wind: {weather.wind.speed} m/s</p>
      <p style={textStyle}>🌥️ Condition: {weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;
