import axios from "axios";
import CityWeather from "../model/weather.model.js";
import User from "../model/user.model.js";
import {
  E,
  EP,
  OPENWEATHER_API_KEY,
  OPENWEATHER_URI,
} from "../config/server.config.js";
import cron from "node-cron";
import CustomError from "../helpers/CustomError.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

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

export async function setAlertService(token, thresholds, preferredCityId) {
  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET).id;
    console.log(userId, thresholds, preferredCityId);
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { thresholds: thresholds }, preferredCityId },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return user.thresholds;
  } catch (error) {
    throw new CustomError("Error setting alert preferences", 500);
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: E,
    pass: EP,
  },
});

export const checkThresholdsAndNotify = async () => {
  try {
    const users = await User.find({});
    console.log("Checking thresholds and sending notifications...");

    for (const user of users) {
      const cityWeather = await CityWeather.findOne({
        cityId: user.preferredCityId,
      });


      if (!cityWeather) continue;

      const latestWeather = cityWeather.weatherHistory.slice(-1)[0];

      
      
      let shouldSendAlert = false;
      let alertMessage = "";
      
      // Check if it's been at least 24 hours since the last alert for this user
      const timeNow = new Date();
      const timeLimit = 60 * 60 * 1000; // 24 hours in milliseconds
      
      console.log("latestWeather.temp", latestWeather.temp);
      console.log(
        "user.thresholds.temperature.min", 
        user.thresholds.temperature.min
      );
      // Check temperature thresholds
      if (
        user.thresholds.temperature.min !== null &&
        latestWeather.temp < user.thresholds.temperature.min &&
        (!user.lastAlert ||
          timeNow - user.lastAlert.temperature.min > timeLimit)
      ) {
        shouldSendAlert = true;
        alertMessage += `Temperature dropped below ${user.thresholds.temperature.min}°C.\n`;
        user.lastAlert.temperature.min = timeNow; // Update the last alert timestamp
      }
      if (
        user.thresholds.temperature.max !== null &&
        latestWeather.temp > user.thresholds.temperature.max &&
        (!user.lastAlert ||
          timeNow - user.lastAlert.temperature.max > timeLimit)
      ) {
        shouldSendAlert = true;
        alertMessage += `Temperature exceeded ${user.thresholds.temperature.max}°C.\n`;
        user.lastAlert.temperature.max = timeNow; // Update the last alert timestamp
      }

      // Check weather condition thresholds
      if (
        user.thresholds.weatherCondition &&
        latestWeather.weather.some(
          (w) => w.main === user.thresholds.weatherCondition
        ) &&
        (!user.lastAlert ||
          timeNow - user.lastAlert.weatherCondition > timeLimit)
      ) {
        shouldSendAlert = true;
        alertMessage += `Weather condition: ${user.thresholds.weatherCondition} detected.\n`;
        user.lastAlert.weatherCondition = timeNow; // Update the last alert timestamp
      }

      // Send alert if necessary
      if (shouldSendAlert) {
        console.log("Sending email to", user.email);
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: user.email,
          subject: "Weather Alert Notification",
          text: `Dear ${user.name},\n\n${alertMessage}\nStay safe!\n\nBest regards,\nWeather Monitoring App`,
        });
        console.log("Email sent to", user.email);

        // Track the alert in user's notifications
        user.alerts.push({
          type: "ThresholdAlert",
          triggeredAt: new Date(),
          notificationSent: true,
        });
        await user.save();
      }
    }
  } catch (error) {
    console.error(
      "Error checking thresholds and sending notifications:",
      error
    );
  }
};

export const startCronNofications = async () => {
  await checkThresholdsAndNotify();
  cron.schedule("*/15 * * * *", async () => {
    console.log("Running threshold check...");
    await checkThresholdsAndNotify();
  });
};
