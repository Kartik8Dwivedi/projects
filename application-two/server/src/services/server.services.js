import axios from "axios";
import CityWeather from "../model/weather.model.js";
import User from "../model/user.model.js";
import {
  OPENWEATHER_API_KEY,
  OPENWEATHER_URI,
} from "../config/server.config.js";
import cron from "node-cron";
import CustomError from "../helpers/CustomError.js";

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

    await CityWeather.findOneAndUpdate(
      { cityId },
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

    if (!weatherHistory || weatherHistory.length === 0) {
      console.log(`No weather history for city: ${city.cityName}`);
      continue; // Skip to the next city if no history exists
    }

    console.log("Weather history for city:", weatherHistory);

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

    // Ensure the dailyAggregates array is initialized
    if (!city.aggregatedData.dailyAggregates) {
      city.aggregatedData.dailyAggregates = []; // Initialize if empty
    }

    // Create a new daily aggregate entry
    const dailyAggregateEntry = {
      date: new Date(), // Use the current date
      avgTemp,
      maxTemp,
      minTemp,
      dominantWeather,
    };

    // Add the new entry to the dailyAggregates array
    city.aggregatedData.dailyAggregates.push(dailyAggregateEntry);

    try {
      await city.save(); // Save updated city data with new aggregate
      console.log(
        "Daily aggregate entry added and city data saved successfully."
      );
    } catch (error) {
      console.error("Error saving city data:", error);
    }
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

export async function startCronAggregation() {
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("Starting daily summary aggregation...");
      await aggregateDailySummary();
      console.log("Daily summary aggregation completed.");
    } catch (error) {
      console.error("Error during daily summary aggregation:", error);
    }
  });
}

// cleanup weather data to maintain size limit
export async function cleanupWeatherData() {
  const cities = await CityWeather.find({});
  for (const city of cities) {
    if (city.weatherHistory && city.weatherHistory.length > 12) {
      city.weatherHistory = city.weatherHistory.slice(-12);
      await city.save();
    }
  }
  console.log(
    "Cleanup of weather data completed, ensuring size limit is maintained."
  );
}

export async function getCurrentWeather() {
  try {
    const cities = await CityWeather.find({});
    return cities;
  } catch (error) {
    console.log(
      "Error in fetching current weather data in service layer",
      error
    );
    throw error;
  }
}

export async function getWeatherHistory(cityId) {
  try {
    const city = await CityWeather.findOne({ cityId });
    if (!city) {
      throw new CustomError("City not found", 404);
    }
    return city.weatherHistory;
  } catch (error) {
    console.log(
      "Error in fetching weather history data in service layer",
      error
    );
    throw error;
  }
}

export async function setAlertService(userId, thresholds) {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { alertPreferences: thresholds } },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return user.alertPreferences;
  } catch (error) {
    res.status(500).json({ message: "Error saving alert preferences", error });
  }
}

export async function getAlertPreferences(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return user.alertPreferences;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching alert preferences", error });
  }
}
