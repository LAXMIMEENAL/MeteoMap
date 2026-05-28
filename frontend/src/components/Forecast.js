import React from "react";
import ForecastCard from "./ForecastCard";
import "./Forecast.css";

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return <p>No forecast available</p>;

  const fiveDays = forecast.slice(0, 5); // show only 5 days

  return (
    <div className="forecast-container">
      {fiveDays.map((day, i) => (
        <ForecastCard key={i} day={day} />
      ))}
    </div>
  );
}

export default Forecast;
