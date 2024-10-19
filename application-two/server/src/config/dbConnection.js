import { connect } from "mongoose";
import { MONGO_URI } from "./server.config.js";
import { cleanupWeatherData } from "../services/server.services.js";

const connectToDB = async () => {
  await connect(MONGO_URI)
    .then(async (conn) => {
      console.log(`Connected to ${conn.connection.host}`);
      await cleanupWeatherData();
    })
    .catch((e) => {
      console.log("Failed to connect to database, ", e.message);
    });
};

export default connectToDB;
