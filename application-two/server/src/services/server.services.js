import axios from "axios";
import CityWeather from "../model/weather.model.js";
import {
  OPENWEATHER_API_KEY,
  OPENWEATHER_URI,
} from "../config/server.config.js";
import cron from "node-cron";

// get weather data for all six cities
export async function getWeatherData() {
  try {
    const cities = [
      "Delhi",
      "Mumbai",
      "Chennai",
      "Bangalore",
      "Kolkata",
      "Hyderabad",
    ];
    const results = [];

    for (const city of cities) {
      const URI = `${OPENWEATHER_URI}?q=${city}&appid=${OPENWEATHER_API_KEY}`;
      const response = await axios.get(URI);
      results.push(response.data);
    }

    return results;
  } catch (error) {
    console.log("Error in fetching weather data", error);
    throw error;
  }
}

// update the data for the cities
export async function updateWeatherData() {
  const weatherDataArray = await getWeatherData();

  for (const cityWeather of weatherDataArray) {
    const {
      name: cityName,
      id: cityId,
      coord: { lon, lat },
      main: { temp, feels_like, temp_min, temp_max },
      weather,
      dt,
    } = cityWeather;

    const tempCelsius = temp - 273.15;
    const feelsLikeCelsius = feels_like - 273.15;
    const tempMinCelsius = temp_min - 273.15;
    const tempMaxCelsius = temp_max - 273.15;

    const cityRecord = await CityWeather.findOneAndUpdate(
      { cityId }, // Find city by its ID
      {
        cityName,
        coordinates: { lon, lat },
        $push: {
          weatherHistory: {
            timestamp: new Date(dt * 1000),
            temp: tempCelsius,
            feels_like: feelsLikeCelsius,
            temp_min: tempMinCelsius,
            temp_max: tempMaxCelsius,
            weather,
          },
        },
      },
      { upsert: true, new: true }
    );

    await CityWeather.updateOne(
      { cityId },
      { $slice: { weatherHistory: -12 } }
    );
  }

  console.log("Weather data updated successfully");
}
