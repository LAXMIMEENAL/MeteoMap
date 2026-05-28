
import express from "express";
import axios from "axios";
import { Favorite } from "./models.js";
const router = express.Router();
const apiKey = process.env.WEATHER_API_KEY;
async function getCoordinates(city) {
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const geoRes = await axios.get(geoUrl);
  if (!geoRes.data.length) return null;
  return geoRes.data[0]; 
}
router.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const coords = await getCoordinates(city);
    if (!coords) return res.status(404).json({ error: "City not found" });
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
    const weatherRes = await axios.get(weatherUrl);
    res.json(weatherRes.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});
router.get("/forecast/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const coords = await getCoordinates(city);
    if (!coords) return res.status(404).json({ error: "City not found" });
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
    const forecastRes = await axios.get(forecastUrl);
    const list = forecastRes.data.list;
    const dailyForecast = {};

    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; 
      const weatherIcon = item.weather[0].icon;
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          condition: item.weather[0].main,
        };
      } else {
        dailyForecast[date].temp_min = Math.min(dailyForecast[date].temp_min, item.main.temp_min);
        dailyForecast[date].temp_max = Math.max(dailyForecast[date].temp_max, item.main.temp_max);
      }
    });
    const result = Object.keys(dailyForecast).map((date) => ({
      date,
      ...dailyForecast[date],
    }));

    res.json({
      city: coords.name,
      forecast: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch forecast" });
  }
});

router.get("/air/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const coords = await getCoordinates(city);
    if (!coords) return res.status(404).json({ error: "City not found" });

    const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
    const airRes = await axios.get(airUrl);

    res.json({
      city: coords.name,
      aqi: airRes.data.list[0].main.aqi,
      components: airRes.data.list[0].components,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch AQI" });
  }
});
router.post("/favorites", async (req, res) => {
  const { city, country, user } = req.body;
  try {
    const fav = new Favorite({ city, country, user });
    await fav.save();
    res.json(fav);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save favorite" });
  }
});
router.get("/favorites/:user", async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.params.user });
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});
export default router;






















