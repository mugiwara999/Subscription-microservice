import { subscriptionRepo } from "../repositories/subscriptionRepo";
import { planRepo } from "../repositories/planRepo";
import { ScheduleExpiration } from "../config/queues";
import { Subscription } from "@prisma/client";


export const subscriptionService = {
    async create(data: {
        user_id: string;
        plan_id: string;
    }): Promise<Subscription> {
        const plan = await planRepo.getById(data.plan_id);
        if (!plan) {
            throw { statusCode: 404, message: 'Plan not found' };
        }

        const now = new Date();
        const expiresAt = new Date(now.getTime() + plan.duration * 24 * 60 * 60 * 1000);

        const sub = await subscriptionRepo.create({
            user_id: data.user_id,
            plan_id: data.plan_id,
            expiresAt,
            status: "ACTIVE"
        });

        ScheduleExpiration(sub.id, expiresAt.getTime() - Date.now());
        return sub;
    },


    async getByUserId(userId: string): Promise<Subscription | null> {
        return await subscriptionRepo.getByUserId(userId);
    },

    async cancelSubscription(id: string , user_id: string): Promise<Subscription | null> {
        const sub = await subscriptionRepo.getByUserId(user_id);
        if (!sub) {
            throw { statusCode: 404, message: 'Subscription not found' };
        }

        if (sub.user_id !== user_id) {
            throw { statusCode: 403, message: 'Unauthorized' };
        }

        return await subscriptionRepo.updateStatus(id, 'CANCELLED');
    },

    async delete(user_id: string): Promise<Subscription | null> {
        return await subscriptionRepo.deleteByUserId(user_id);
    },

    async upgradeSubscription(id: string, plan_id: string): Promise<Subscription | null> {
        const sub = await subscriptionRepo.getByUserId(id);
        if (!sub) {
            throw { statusCode: 404, message: 'Subscription not found' };
        }
        const plan = await planRepo.getById(plan_id);
        if (!plan) {
            throw { statusCode: 404, message: 'Plan not found' };
        }

        const now = new Date();
        const expiresAt = new Date(now.getTime() + plan.duration * 24 * 60 * 60 * 1000);

        const updated = await subscriptionRepo.updatePlan(sub.id, { plan_id, expiresAt });
        const delay = expiresAt.getTime() - Date.now();
        ScheduleExpiration(updated.id, delay);
        return updated;
    }
}
