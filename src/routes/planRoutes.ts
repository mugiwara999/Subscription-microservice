import express from "express";
import { planController } from "../controllers/planController";
import { authMiddleware } from "../middleware/auth";

const planRouter = express.Router();

planRouter.get("/", planController.getAll);
planRouter.get("/:id", planController.getById);
planRouter.post("/", authMiddleware, planController.create);
planRouter.put("/:id", authMiddleware, planController.update);
planRouter.delete("/:id", authMiddleware, planController.delete);

export default planRouter;