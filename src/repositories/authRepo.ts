import { User } from "@prisma/client";
import prisma from "../config/prisma";

export const authRepo = {
    findUserByEmail: async (email: string): Promise<User | null> => {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    },
    createUser: async (email: string, hashedPassword: string): Promise<User | null> => {
        const user = await prisma.user.create({ data: { email, password: hashedPassword } });
        return user;
    }
}