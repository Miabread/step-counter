import { PrismaClient } from '@prisma/client';

declare global {
    namespace NodeJS {
        interface Global {
            prisma?: PrismaClient;
        }
    }
}

const isProd = process.env.NODE_ENV === 'production';

export const prisma = isProd
    ? new PrismaClient()
    : global.prisma ?? new PrismaClient();

export const closeIfProd = async () => {
    if (isProd) await prisma.$disconnect();
};
