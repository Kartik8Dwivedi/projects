import { Router } from "express";
import ServerController from "../../controllers/server.controller.js";
import AuthController from "../../controllers/auth.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const serverController = new ServerController();
const authController = new AuthController();

const router = Router();

router.get("/", authenticate, serverController.default_);
router.get("/data", authenticate, serverController.getCurrentWeather);
router.get(
  "/history/:cityId",
  authenticate,
  serverController.getWeatherHistory
);
router.post("/alerts", serverController.setAlertPreferences);
router.get("/alerts/:userId", serverController.getAlertPreferences);

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;

/**



// Get Alert Preferences for a specific user
router.get('/alerts/:userId', getAlertPreferences);

// Test Alert System
router.post('/alerts/test', testAlertSystem);
 
 */
