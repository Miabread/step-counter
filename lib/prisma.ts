import { PrismaClient } from '@prisma/client';

declare global {
    namespace NodeJS {
        interface Global {
            prisma?: PrismaClient;
        }
    }
}

export const prisma =
    process.env.NODE_ENV === 'production'
        ? new PrismaClient()
        : global.prisma ?? new PrismaClient();
