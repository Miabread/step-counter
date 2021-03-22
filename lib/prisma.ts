import { PrismaClient } from '@prisma/client';

// Constants
const isProd = process.env.NODE_ENV === 'production';
const devClientCache = Symbol('devClientCache');

// Required for TypeScript on the `global.prisma` assignment
declare global {
    namespace NodeJS {
        interface Global {
            [devClientCache]?: PrismaClient;
        }
    }
}

// Private to module, others must go through `usePrisma()`
const prisma = isProd
    ? // Fresh client for each production instance
      new PrismaClient()
    : // Reuse a global client for developing
      (global[devClientCache] ??= new PrismaClient());

// Allows us to add pre or post code to database access
export const usePrisma = async <R>(
    body: (prisma: PrismaClient) => Promise<R>,
) => {
    const result = await body(prisma);

    // Prisma will try to keep connections alive
    // We have a low limit so force it not to
    if (isProd) await prisma.$disconnect();

    return result;
};
