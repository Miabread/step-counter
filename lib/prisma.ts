import { PrismaClient } from "@prisma/client"

let database: PrismaClient;

if (process.env.NODE_ENV === "production") {
    database = new PrismaClient()
} else {
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient()
    }

    database = (global as any).prisma
}

export const prisma = database;
