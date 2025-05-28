import express from "express";
import { planController } from "../controllers/planController";

const planRouter = express.Router();

planRouter.get("/", planController.getAllPlans);
planRouter.get("/:id", planController.getPlanById);
planRouter.post("/", planController.createPlan);
planRouter.put("/:id", planController.updatePlan);
planRouter.delete("/:id", planController.deletePlan);

export default planRouter;