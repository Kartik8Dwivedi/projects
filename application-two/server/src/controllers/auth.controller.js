import { appError, appSuccess } from "../config/server.response.js";
import { loginService, registerService } from "../services/auth.service.js";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await loginService(email, password);
      let obj = {
        res,
        statusCode: 200,
        data: { token },
        message: "User logged in successfully",
      };
      return appSuccess(obj);
    } catch (error) {
      let obj = {
        res,
        statusCode: error.statusCode || 500,
        error,
        message: error.message || "Internal server error",
      };
      console.log(error);
      return appError(obj);
    }
  }
  async register(req, res) {
    try {
      let { email, password, name, preferredCityId } = req.body;
      if (!email || !password || !name) {
        let obj = {
          res,
          statusCode: 400,
          message:
            "Please provide all required fields, email, password and name (preferredCityId is optional)",
        };
        return appError(obj);
      }
      if (!preferredCityId) {
        preferredCityId = 1273294; // default city is set to Delhi
      }
      const response = await registerService(
        email,
        password,
        name,
        preferredCityId
      );
      let obj = {
        res,
        statusCode: 201,
        data: response,
        message: "User registered successfully",
      };
      return appSuccess(obj);
    } catch (error) {
      let obj = {
        res,
        statusCode: error.statusCode || 500,
        error,
        message: error.message || "Internal server error",
      };
      console.log(error);
      return appError(obj);
    }
  }
  async logout(req, res) {
    // logout logic
  }
}

export default AuthController;
