import { NextFunction, Request, Response } from "express";
import planService from "../services/planService";
import { createPlanSchema, updatePlanSchema } from "../types";

export const planController = {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const plans = await planService.getAll();
            res.json(plans);
        } catch (error) {
            next(error);
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const plan = await planService.getById(id);
            res.json(plan);
        } catch (error) {
            next(error);
        }
    },

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const parsedBody = createPlanSchema.safeParse(req.body);
            if (!parsedBody.success) {
                return res.status(400).json({ error: "Invalid request body" });
            }

            const { name, price, features, duration } = parsedBody.data;
            const plan = await planService.create({ name, price, features, duration });
            res.json(plan);
        } catch (error) {
            next(error);
        }
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const parsedBody = updatePlanSchema.safeParse(req.body);
            if (!parsedBody.success) {
                return res.status(400).json({ error: "Invalid request body" });
            }

            const { name, price, features, duration } = parsedBody.data;
            const plan = await planService.update(id, { name, price, features, duration });
            res.json(plan);
        } catch (error) {
            next(error);
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const plan = await planService.delete(id);
            res.json(plan);
        } catch (error) {
            next(error);
        }
    }
}
