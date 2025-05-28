import { NextFunction, Request, Response } from 'express';
import { subscriptionService } from '../services/subscriptionService';

export const subscriptionController = { 
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user?.user_id;
            if (!user_id) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const { plan_id } = req.body;
            const subscription = await subscriptionService.create({ user_id, plan_id });
            res.status(200).json(subscription);
        } catch (error) {
            next(error);
        }
    },

    async getByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user?.user_id;
            if (!user_id) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const subscription = await subscriptionService.getByUserId(user_id);
            res.status(200).json(subscription);
        } catch (error) {
            next(error);
        }
    },

    async cancel(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user?.user_id;
            if (!user_id) {
                res.status(401).json({ error: 'Unauthorized' });
                return 
            }
            const { id } = req.params;
            const subscription = await subscriptionService.cancelSubscription(id, user_id);
            res.status(200).json(subscription);
        } catch (error) {
            next(error);
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user?.user_id;
            if (!user_id) {
                res.status(401).json({ error: 'Unauthorized' });
                return 
            }
            const subscription = await subscriptionService.delete(user_id);
            res.status(200).json(subscription);
        } catch (error) {
            next(error);
        }
    }
}