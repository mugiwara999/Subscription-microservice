import { authService } from "../services/authService";
import { NextFunction, Request, Response } from "express";

export const authController = {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.login(email, password);
            res.status(200).json({ user, token });
        } catch (error) {
            next(error);
        }
    },
    
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.signup(email, password);
            res.status(200).json({ user, token });
        } catch (error) {
            next(error);
        }
    }
}
