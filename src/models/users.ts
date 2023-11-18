import { getPrismaClient } from "./prisma";

export const getUsers = async () => {
    const client = getPrismaClient();
    return await client.user.findMany();
};
