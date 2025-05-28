import { planRepo } from "../repositories/PlanRepo";
import redis from "../config/redis";
import { Plan } from "@prisma/client";
const CACHE_KEY = "plans";

const planService = {
    async getAllPlans(): Promise<Plan[]> {
        const cachedPlans = await redis.get(CACHE_KEY);
        if (cachedPlans) {
            return JSON.parse(cachedPlans);
        }
        const plans = await planRepo.getAllPlans();
        await redis.setex(CACHE_KEY, 3600, JSON.stringify(plans));
        return plans;
    },

    async getPlanById(id: string): Promise<Plan | null> {
        const cachedPlan = await redis.get(`${CACHE_KEY}:${id}`);
        if (cachedPlan) {
            return JSON.parse(cachedPlan);
        }
        const plan = await planRepo.getPlanById(id);
        if (plan) {
            await redis.setex(`${CACHE_KEY}:${id}`, 3600, JSON.stringify(plan));
        }
        return plan;
    },

    async createPlan(input: { name: string; price: number; features: any; duration: number }): Promise<Plan> {
        const newPlan = await planRepo.createPlan(input);
        await redis.del(CACHE_KEY);
        await redis.setex(`${CACHE_KEY}:${newPlan.id}`, 3600, JSON.stringify(newPlan));

        return newPlan;
    },

    async updatePlan(id: string, input: Partial<{ name: string; price: number; features: any; duration: number }>): Promise<Plan | null> {
        const updatedPlan = await planRepo.updatePlan(id, input);
        if (updatedPlan) {
            await redis.del(CACHE_KEY);
            await redis.setex(`${CACHE_KEY}:${updatedPlan.id}`, 3600, JSON.stringify(updatedPlan));
        }
        return updatedPlan;
    },

    async deletePlan(id: string): Promise<Plan | null> {
        const deletedPlan = await planRepo.deletePlan(id);
        if (deletedPlan) {
            await redis.del(CACHE_KEY);
            await redis.del(`${CACHE_KEY}:${deletedPlan.id}`);
            return deletedPlan;
        }
        return null;
    }
}

export default planService;
