import { SubscriptionStatus } from "@prisma/client";
import prisma from "../config/prisma";

export const subscriptionRepo = {
    create: (data: {
        expiresAt: Date;
        user_id: string;
        plan_id: string;
    }) => {
        return prisma.subscription.create({ data });
    },
    getByUserId: (user_id: string) => {
        return prisma.subscription.findFirst({
            where: {
                user_id: user_id
            }
        });
    },
    getByUserIdAndPlanId: (user_id: string, plan_id: string) => {
        return prisma.subscription.findFirst({
            where: {
                user_id: user_id,
                plan_id: plan_id
            }
        });
    },

    updateStatus: (id: string, status: SubscriptionStatus) => {
        return prisma.subscription.update({ where: { id }, data: { status } });
    },

    deleteByUserId: (user_id: string) => {
        return prisma.subscription.delete({ where: { user_id } });
    }
}