import {z} from 'zod'

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export type SignupRequest = z.infer<typeof signupSchema>
export type LoginRequest = z.infer<typeof loginSchema>


export const createPlanSchema = z.object({
    name: z.string(),
    price: z.number(),
    features: z.array(z.string()),
    duration: z.number(),
    })

export type CreatePlanSchema = z.infer<typeof createPlanSchema>

export const updatePlanSchema = z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    features: z.array(z.string()).optional(),
    duration: z.number().optional(),
})

export type UpdatePlanSchema = z.infer<typeof updatePlanSchema>

export const createSubscriptionSchema = z.object({
    plan_id: z.string(),
    user_id: z.string()
})

export type CreateSubscriptionSchema = z.infer<typeof createSubscriptionSchema>
