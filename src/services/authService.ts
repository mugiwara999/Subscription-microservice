import { env } from "../config/env";
import { authRepo } from "../repositories/authRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authService = {
    async signup(email: string, password: string) {

        const existingUser = await authRepo.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await authRepo.create(email, hashedPassword);

        if (!user) {
            throw new Error("Failed to create user");
        }

        const token = jwt.sign({ user_id: user.id, email: user.email }, env.JWT_SECRET);
        return { user, token };
    },

    async login(email: string, password: string) {
        const user = await authRepo.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign({ user_id: user.id, email: user.email }, env.JWT_SECRET);
        return { user, token };
    }
}