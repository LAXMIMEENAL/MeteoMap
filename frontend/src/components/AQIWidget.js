
import React from "react";

function AQIWidget({ aqiData }) {
  if (!aqiData) return null;

  const aqiLevels = {
    1: { text: "Good 😊", color: "green" },
    2: { text: "Fair 🙂", color: "yellow" },
    3: { text: "Moderate 😐", color: "orange" },
    4: { text: "Poor 😷", color: "red" },
    5: { text: "Very Poor ☠️", color: "purple" }
  };

  const level = aqiLevels[aqiData.aqi] || { text: "Unknown", color: "gray" };

  const containerStyle = {
    border: `1px solid ${level.color}`,
    padding: "10px",
    maxWidth: "400px",
    margin: "20px auto",
    borderRadius: "8px",
    backgroundColor: "#f9fff9",
  };

  return (
    <div className="aqi-widget" style={containerStyle}>
      <h3><strong>↯ Air Quality in {aqiData.city} :</strong></h3>
      <p><b>AQI:</b> {aqiData.aqi} - {level.text}</p>
      <p>CO: {aqiData.components.co} μg/m³</p>
      <p>NO₂: {aqiData.components.no2} μg/m³</p>
      <p>O₃: {aqiData.components.o3} μg/m³</p>
      <p>PM2.5: {aqiData.components.pm2_5} μg/m³</p>
      <p>PM10: {aqiData.components.pm10} μg/m³</p>
    </div>
  );
}

export default AQIWidget;
