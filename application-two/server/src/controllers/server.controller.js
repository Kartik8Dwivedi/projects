import { appError, appSuccess } from "../config/server.response.js";
import {
  getAlertPreferences,
  getCurrentWeather,
  getWeatherData,
  getWeatherHistory,
  setAlertService,
} from "../services/server.services.js";

class ServerController {
  async default_(req, res) {
    try {
      const obj = {
        res,
        statusCode: 200,
        data: true,
        message: "Authenticated",
      };
      return appSuccess(obj);
    } catch (error) {
      const obj = {
        res,
        statusCode: 500,
        error,
        message: "Internal server error",
      };
      console.log(error);
      return appError(obj);
    }
  }

  async getCurrentWeather(req, res) {
    try {
      let results = await getCurrentWeather();
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

  async getWeatherHistory(req, res) {
    try {
      const { cityId } = req.params;
      if (!cityId) {
        let obj = {
          res,
          statusCode: 400,
          error: {},
          message: "City ID is required",
        };
        return appError(obj);
      }
      let results = await getWeatherHistory(cityId);
      const obj = {
        res,
        statusCode: 200,
        data: results,
        message: "Weather history fetched successfully",
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

  async getWeatherData(req, res) {
    try {
      let results = await getWeatherData();
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

  async setAlertPreferences(req, res) {
    try {
      const { token, thresholds, preferredCityId } = req.body;
      // Example payload: { userId: '123', thresholds: { minTemp: 15, maxTemp: 30 } }
      
      if (!token || !thresholds) {
        let obj = {
          res,
          statusCode: 400,
          error: {},
          message: "token and thresholds are required",
        };
        return appError(obj);
      }
      let result = await setAlertService(token, thresholds, preferredCityId);
      const obj = {
        res,
        statusCode: 200,
        data: result,
        message: "Alert preferences saved successfully",
      };
      return appSuccess(obj);
    } catch (error) {
      console.log("Error in setting alert preferences", error);
      const obj = {
        res,
        statusCode: error.statusCode || 500,
        error,
        message: error.message || "Internal server error",
      };
      return appError(obj);
    }
  }

  async getAlertPreferences(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        let obj = {
          res,
          statusCode: 400,
          error: {},
          message: "User ID is required",
        };
        return appError(obj);
      }
      let res = await getAlertPreferences(userId);
      const obj = {
        res,
        statusCode: 200,
        data: res,
        message: "Alert preferences fetched successfully",
      };
      return appSuccess(obj);
    } catch (error) {
      console.log("Error in getting alert preferences", error);
      const obj = {
        res,
        statusCode: error.statusCode || 500,
        error,
        message: error.message || "Internal server error",
      };
      return appError(obj);
    }
  }
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
