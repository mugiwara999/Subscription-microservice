import express from "express";
import { planController } from "../controllers/planController";

const planRouter = express.Router();

planRouter.get("/", planController.getAll);
planRouter.get("/:id", planController.getById);
planRouter.post("/", planController.create);
planRouter.put("/:id", planController.update);
planRouter.delete("/:id", planController.delete);

export default planRouter;