
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ForecastChart({ forecast }) {
  if (!forecast || !forecast.list) return null;
  const filteredList = forecast.list.filter((_, index) => index % 8 === 0);

  const labels = filteredList.map((item) =>
    new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })
  );

  const temps = filteredList.map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "blue",
        backgroundColor: "lightblue",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, weight: "600" },
          color: "#1e3a8a"
        }
      },
      tooltip: {
        backgroundColor: "#27272a",
        titleFont: { size: 14, weight: "700" },
        bodyFont: { size: 13 },
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: (context) => `${context.parsed.y} °C`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "#e5e7eb",
          borderDash: [5, 5]
        },
        title: {
          display: true,
          text: "Temp (°C)",
          color: "#4b5563",
          font: { size: 13, weight: "600" }
        },
        ticks: {
          color: "#374151",
          font: { size: 12 }
        }
      },
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: "Day",
          color: "#4b5563",
          font: { size: 13, weight: "600" }
        },
        ticks: {
          color: "#374151",
          font: { size: 12, weight: "600" }
        }
      }
    }
  };

  const containerStyle = {
    marginTop: "20px",
    padding: "15px",
    maxWidth: "500px",
    background: "#f0f9ff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  };

  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#0369a1",
    marginBottom: "12px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>📊 5-Day Forecast</h3>
      <div style={{ height: "320px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export function FiveDayList({ forecast }) {
  if (!forecast || !forecast.list) return null;
  const dailyForecasts = forecast.list.filter((_, i) => i % 8 === 0);
  return (
    <div style={{ maxWidth: 500, margin: '20px auto', background: '#f0fdf4', padding: 16, borderRadius: 8, border: '1px solid #a3d9a5' }}>
      <h3 style={{ textAlign: 'center', color: '#207227' }}>5 Day Forecast</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {dailyForecasts.map((item, index) => {
          const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
          return (
            <li key={index} style={{ marginBottom: 10 }}>
              <b>{date}</b>: {item.main.temp}°C, {item.weather[0].description}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
