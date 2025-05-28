import express from "express";
import { subscriptionController } from "../controllers/subscriptionController";
import { authMiddleware } from "../middleware/auth";

const subscriptionRouter = express.Router();

subscriptionRouter.post('/', authMiddleware, subscriptionController.create);
subscriptionRouter.get('/', authMiddleware, subscriptionController.getByUserId);
subscriptionRouter.delete('/:id', authMiddleware, subscriptionController.cancel);
subscriptionRouter.delete('/', authMiddleware, subscriptionController.delete);
subscriptionRouter.put('/upgrade', authMiddleware, subscriptionController.upgrade);
export default subscriptionRouter;