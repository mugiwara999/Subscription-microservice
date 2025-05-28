import { authService } from "../services/authService";
import { Request, Response } from "express";

export const authController = {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.login(email, password);
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    
    async signup(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.signup(email, password);
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
