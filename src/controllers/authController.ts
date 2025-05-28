import { authService } from "../services/authService";
import { NextFunction, Request, Response } from "express";
import { loginSchema, signupSchema } from "../types";

export const authController = {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const parsedBody = loginSchema.safeParse(req.body);
            if (!parsedBody.success) {
                res.status(400).json({ error: "Invalid request body" });
                return;
            }

            const { email, password } = parsedBody.data;
            const { user, token } = await authService.login(email, password);
            res.status(200).json({ user, token });
        } catch (error) {
            next(error);
        }
    },
    
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const parsedBody = signupSchema.safeParse(req.body);
            if (!parsedBody.success) {
                res.status(400).json({ error: "Invalid request body" });
                return;
            }

            const { email, password } = parsedBody.data;
            const { user, token } = await authService.signup(email, password);
            res.status(200).json({ user, token });
        } catch (error) {
            next(error);
        }
    }
}
