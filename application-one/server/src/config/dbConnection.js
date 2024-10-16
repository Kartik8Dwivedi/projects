import { connect } from "mongoose";
import { MONGO_URI } from "./server.config.js";


const connectToDB = async () => {
  await connect(MONGO_URI)
    .then((conn) => {
      console.log(`Connected to ${conn.connection.host}`);
    })
    .catch((e) => {
      console.log("Failed to connect to database, ",e.message);
    });
};

export default connectToDB;
