import { NextFunction, Request, Response } from "express";
import planService from "../services/planService";

export const planController = {
    async getAllPlans(req: Request, res: Response, next: NextFunction) {
        try {
            const plans = await planService.getAllPlans();
            res.json(plans);
        } catch (error) {
            next(error);
        }
    },

    async getPlanById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const plan = await planService.getPlanById(id);
            res.json(plan);
        } catch (error) {
            next(error);
        }
    },

    async createPlan(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, price, features, duration } = req.body;
            const plan = await planService.createPlan({ name, price, features, duration });
            res.json(plan);
        } catch (error) {
            next(error);
        }
    },

    async updatePlan(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, price, features, duration } = req.body;
            const plan = await planService.updatePlan(id, { name, price, features, duration });
            res.json(plan);
        } catch (error) {
            next(error);
        }
    },

    async deletePlan(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const plan = await planService.deletePlan(id);
            res.json(plan);
        } catch (error) {
            next(error);
        }
    }
}
