import React, { useState ,useEffect} from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import MapView from "./components/MapView";
import AQIWidget from "./components/AQIWidget";
import { ForecastChart, FiveDayList } from "./components/ForecastChart";
import Forecast from "./components/Forecast";
function App() {
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [forecast, setForecast] = useState(null);
const fetchByCoords = async (lat, lon) => {
  console.log("Fetching weather for", lat, lon);
  lat = Number(lat);
  lon = Number(lon);
  if (isNaN(lat) || isNaN(lon)) {
    alert("Invalid coordinates");
    return;
  }
  try {
    const weatherRes = await axios.get(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
    setWeather(weatherRes.data);

    const aqiRes = await axios.get(`http://localhost:5000/api/air?lat=${lat}&lon=${lon}`);
    setAqi(aqiRes.data);

    const forecastRes = await axios.get(`http://localhost:5000/api/forecast?lat=${lat}&lon=${lon}`);
    setForecast(forecastRes.data.forecast);   // ✅ make sure to use .forecast
  } catch (err) {
    console.error("Fetch error details:", err.response || err.message || err);
    alert("Failed to fetch data for location. See console for details.");
  }
};
  const fetchWeather = async (city) => {
    try {
      const weatherRes = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(weatherRes.data);

      const aqiRes = await axios.get(`http://localhost:5000/api/air/${city}`);
      setAqi(aqiRes.data);

      const forecastRes = await axios.get(`http://localhost:5000/api/forecast/${city}`);
      setForecast(forecastRes.data.forecast);
    } catch (err) {
      alert("City not found!");
    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/forecast/London")
      .then((res) => res.json())
      .then((data) => setForecast(data.forecast))
      .catch((err) => console.error(err));
  }, []);
  const handleLocationSelect = async ({ lat, lng }) => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const city = res.data.address.city || res.data.address.town || res.data.address.village || res.data.address.county;
    if (city) {
      fetchWeather(city); 
    } else {
      alert("Could not determine city from coordinates");
    }
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    alert("Failed to fetch city name for the location");
  }
};
const backgroundStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: "url('/meteo_image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: -1,               
  };
  const appContentStyle = {
    position: "relative",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    color: "#072d21ff",            
  };
  const appStyle = {
  minHeight: "100vh", 
  overflowX: "hidden",
};
const headingStyle = {
  textAlign: "center",
  marginBottom: "24px",
  marginTop: "10px",
  fontWeight: "700",
  fontSize: "2.5rem",
  color: "#36288dff",
};
return (
  <div className="App" style={appStyle}>
    {/* Fullscreen background image fixed behind */}
    <div style={backgroundStyle} />

    {/* Main app content on top */}
    <div style={appContentStyle}>
      <h1 style={headingStyle}>MeteoMap 🌍</h1>
      
      <SearchBar onSearch={fetchWeather} />
      <WeatherCard weather={weather} />
      <AQIWidget aqiData={aqi} />
      <ForecastChart forecast={forecast} />
      <FiveDayList forecast={forecast} />
      <MapView weather={weather} onLocationSelect={handleLocationSelect} /> 
      <h1>5-Day Forecast</h1>
      <Forecast forecast={forecast} />
      
    </div>
  </div>
);
}
export default App;






