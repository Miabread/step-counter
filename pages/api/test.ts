import { prisma } from "../../lib/prisma";
import { NowRequest, NowResponse } from '@vercel/node';

export default async (req: NowRequest, res: NowResponse) => {
    console.log(process.env.DATABASE_URL)
    return await prisma.entry.findMany();
};
