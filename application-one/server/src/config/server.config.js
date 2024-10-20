import { config } from "dotenv";


config();

export const PORT = process.env.PORT || 5555;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/app";