import React from "react";
import "./ForecastCard.css";

function ForecastCard({ day }) {
  const { date, temp_min, temp_max, condition } = day;
  const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  const conditionMap = {
  Clear: "https://openweathermap.org/img/wn/01d@2x.png",
  Clouds: "https://openweathermap.org/img/wn/03d@2x.png",
  Rain: "https://openweathermap.org/img/wn/10d@2x.png",
  Snow: "https://openweathermap.org/img/wn/13d@2x.png",
  Drizzle: "https://openweathermap.org/img/wn/09d@2x.png",
  Thunderstorm: "https://openweathermap.org/img/wn/11d@2x.png",
  Mist: "https://openweathermap.org/img/wn/50d@2x.png"
};
const iconSrc = conditionMap[condition] || conditionMap["Clear"];
  return (
    <div className="forecast-card">
      <h3>{dayName}</h3>
      <img src={iconSrc} alt={condition} />
      <p>{condition}</p>
      <p>{temp_min}°C / {temp_max}°C</p>
    </div>
  );
}

export default ForecastCard;
