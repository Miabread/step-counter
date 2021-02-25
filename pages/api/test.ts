import { prisma } from "../../lib/prisma";
import { NowRequest, NowResponse } from '@vercel/node';

export default async (req: NowRequest, res: NowResponse) => {
    return await prisma.entry.findMany();
};
