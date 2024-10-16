import { Router } from "express";
import ServerController from "../../controllers/server.controller.js";

const serverController = new ServerController();

const router = Router();

router.get("/", serverController.default_);

export default router;
