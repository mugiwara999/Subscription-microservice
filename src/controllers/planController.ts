import { NextFunction, Request, Response } from "express";
import planService from "../services/planService";

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
            const { name, price, features, duration } = req.body;
            const plan = await planService.create({ name, price, features, duration });
            res.json(plan);
        } catch (error) {
            next(error);
        }
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, price, features, duration } = req.body;
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
