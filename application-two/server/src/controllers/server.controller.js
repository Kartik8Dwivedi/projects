import { appError, appSuccess } from "../config/server.response.js";
import { getWeatherData } from "../services/server.services.js";
// import {

// } from "../services/server.services.js";

class ServerController {
  async default_(req, res) {
    try {
        const obj = {
            res,
            statusCode: 200,
            data: {},
            message: "Server is up and running"
        }
      return appSuccess(obj);
    } catch (error) {
        const obj = {
            res,
            statusCode: 500,
            error,
            message: "Internal server error"
        }
      console.log(error);
      return appError(obj);
    }
  }

  async getWeatherData(req,res) {
    try {
        let results = await getWeatherData();
        console.log("RESULTS IN CONTROLLER LAYER________________________", results);
      const obj = {
        res,
        statusCode: 200,
        data: results,
        message: "Weather data fetched successfully",
      };
      return appSuccess(obj);
    } catch (error) {
      const obj = {
        res,
        statusCode: error.statusCode || 500,
        error,
        message: error.message || "Internal server error",
      };
      console.log(error);
      return appError(obj);
    }
  }

  async setThreshold(req,res) {}

  async getDailySummaries(req,res) {}
}

export default ServerController;

/**
 *      

    appError and appSuccess are functions that are used to send responses to the client.

    appSuccess requires the following parameters:
    res: The response object
    statusCode: The success code to be sent
    data: The data to be sent to the client
    message: The message to be sent to the client

    appError requires the following parameters:
    res: The response object
    statusCode: The error code to be sent
    error: The error object
    message: The message to be sent to the client
 
 * 
 */
