import { Router } from "express";
import ServerController from "../../controllers/server.controller.js";

const serverController = new ServerController();

const router = Router();

router.get("/", serverController.default_);
router.post("/rules", serverController.create); // create rule
router.get("/rules", serverController.getRules); // get all rules
router.get("/rules/:id", serverController.getRuleById) // get rule by id
router.post("/rules/:ruleId/evaluate", serverController.evaluateRule); // evaluate rule
router.put("/rules/:id", serverController.updateRule); // update rule
router.post("/combine", serverController.combineRules); // combine rules
router.delete("/rules/:id", serverController.deleteRule); // delete rule

export default router;
