import { Router } from "express";
import ServerController from "../../controllers/server.controller.js";

const serverController = new ServerController();

const router = Router();

router.get("/", serverController.default_);
router.get("/data", serverController.getWeatherData);
router.post("/threshold", serverController.setThreshold);
router.get("/summaries", serverController.getDailySummaries);


export default router;
