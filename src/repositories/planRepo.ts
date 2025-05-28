import { Plan } from "@prisma/client";
import prisma from "../config/prisma";

export const planRepo = {
    async create(data: { name: string, price: number, features: string[], duration: number }): Promise<Plan> {
        return prisma.plan.create({ data });
    },

    async getAll(): Promise<Plan[]> {
        return prisma.plan.findMany({
            orderBy: {
                price: "asc"
            }
        });
    },

    async getById(id: string): Promise<Plan | null> {
        return prisma.plan.findUnique({ where: { id } });
    },

    async update(id: string, data: Partial<{ name: string; price: number; features: any; duration: number }>): Promise<Plan | null> {
        return prisma.plan.update({ where: { id }, data });
    },

    async delete(id: string): Promise<Plan | null> {
        return prisma.plan.delete({ where: { id } });
    }
}