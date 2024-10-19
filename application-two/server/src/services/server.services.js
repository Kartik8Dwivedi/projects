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

// aggregate daily summaries for each city
export async function aggregateDailySummary() {
  const cities = await CityWeather.find({});

  for (const city of cities) {
    const weatherHistory = city.weatherHistory;
    if (!weatherHistory || weatherHistory.length === 0) continue;

    // Calculate daily aggregates
    const temps = weatherHistory.map((entry) => entry.temp);
    const avgTemp = temps.reduce((sum, t) => sum + t, 0) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);

    // Calculate dominant weather condition
    const weatherConditions = weatherHistory.flatMap((entry) =>
      entry.weather.map((w) => w.main)
    );
    const dominantWeather = weatherConditions
      .sort(
        (a, b) =>
          weatherConditions.filter((v) => v === a).length -
          weatherConditions.filter((v) => v === b).length
      )
      .pop();

    // Update daily summary in the database
    city.dailySummary = {
      avgTemp,
      maxTemp,
      minTemp,
      dominantWeather,
      timestamp: new Date(), // Use current time for daily summary timestamp
    };

    await city.save();
  }

  console.log("Daily summaries aggregated successfully");
}

// cron job for weather updates at every 15 minutes
export async function startCronJob() {
  console.log("Starting the first weather update task...");
  await updateWeatherData();

  // cron for subsequent updates every 15 minutes
  cron.schedule("*/15 * * * *", async () => {
    console.log("Running scheduled weather update task...");
    await updateWeatherData();
  });
}
