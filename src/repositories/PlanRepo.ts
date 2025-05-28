import { Plan } from "@prisma/client";
import prisma from "../config/prisma";

export const planRepo = {
    async createPlan(data: { name: string, price: number, features: string[], duration: number }): Promise<Plan> {
        return prisma.plan.create({ data });
    },

    async getAllPlans(): Promise<Plan[]> {
        return prisma.plan.findMany({
            orderBy: {
                price: "asc"
            }
        });
    },

    async getPlanById(id: string): Promise<Plan | null> {
        return prisma.plan.findUnique({ where: { id } });
    },

    async updatePlan(id: string, data: Partial<{ name: string; price: number; features: any; duration: number }>): Promise<Plan | null> {
        return prisma.plan.update({ where: { id }, data });
    },

    async deletePlan(id: string): Promise<Plan | null> {
        return prisma.plan.delete({ where: { id } });
    }
}