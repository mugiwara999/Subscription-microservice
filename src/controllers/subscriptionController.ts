import { NextFunction, Request, Response } from 'express';
import { subscriptionService } from '../services/subscriptionService';
import { createSubscriptionSchema, upgradeSubscriptionSchema } from '../types';

export const subscriptionController = { 
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user?.user_id;
            if (!user_id) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const parsedBody = createSubscriptionSchema.safeParse(req.body);
            if (!parsedBody.success) {
                res.status(400).json({ error: "Invalid request body" });
                return;
            }
            const { plan_id } = parsedBody.data;

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
    },

    async upgrade(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user?.user_id;
            if (!user_id) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const parsedBody = upgradeSubscriptionSchema.safeParse(req.body);
            if (!parsedBody.success) {
                res.status(400).json({ error: "Invalid request body" });
                return;
            }
            const { plan_id } = parsedBody.data;

            const subscription = await subscriptionService.upgradeSubscription(user_id, plan_id);
            res.status(200).json(subscription);
        } catch (error) {
            next(error);
        }
    }
}