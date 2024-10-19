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
router.post("/threshold", authenticate, serverController.setThreshold);
router.get("/summaries", authenticate, serverController.getDailySummaries);

router.get("/register", authController.register);
router.get("/login", authController.login);

export default router;

/**

// Get Weather History for a specific city
router.get('/history/:cityId', getWeatherHistory);

// Get Daily Summary for a specific city
router.get('/daily-summary/:cityId', getDailySummary);

// Get Aggregated Data for a specific city
router.get('/aggregated-data/:cityId', getAggregatedData);

// Set Alert Preferences
router.post('/alerts', setAlertPreferences);

// Get Alert Preferences for a specific user
router.get('/alerts/:userId', getAlertPreferences);

// Test Alert System
router.post('/alerts/test', testAlertSystem);
 
 */
