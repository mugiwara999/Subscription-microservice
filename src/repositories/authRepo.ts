import { User } from "@prisma/client";
import prisma from "../config/prisma";

export const authRepo = {
    findByEmail: async (email: string): Promise<User | null> => {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    },
    create: async (email: string, hashedPassword: string): Promise<User | null> => {
        const user = await prisma.user.create({ data: { email, password: hashedPassword } });
        return user;
    }
}