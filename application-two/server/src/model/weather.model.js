import { Schema, model } from "mongoose";

const weatherUpdateSchema = new Schema({
  cityName: { type: String, required: true },
  cityId: { type: Number, required: true }, 
  coordinates: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
  },
  weatherHistory: [
    {
      timestamp: { type: Date, required: true }, 
      temp: { type: Number, required: true }, 
      feels_like: { type: Number },
      temp_min: { type: Number },
      temp_max: { type: Number },
      weather: [
        {
          id: { type: Number },
          main: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
    },
  ],
  dailySummary: {
    avgTemp: { type: Number },
    maxTemp: { type: Number },
    minTemp: { type: Number },
    dominantWeather: { type: String }, 
    timestamp: { type: Date }, 
  },
});

export default model("CityWeather", weatherUpdateSchema);
