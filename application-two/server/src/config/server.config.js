import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5555;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/app";

export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
export const OPENWEATHER_URI =
  process.env.OPENWEATHER_URI ||
  "https://api.openweathermap.org/data/2.5/weather";

export const JWT_SECRET = process.env.JWT_SECRET || "aefihuaiujhboiuvhado";

export const E = process.env.EMAIL || "smtp.ethereal.email";
export const EP = process.env.EMAIL_PASSWORD || "smtp.ethereal.email";
