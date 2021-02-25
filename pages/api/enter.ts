// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../lib/prisma";
import { NowRequest, NowResponse } from '@vercel/node';
import { getShop } from "../../lib/shop";

interface Input {
    email: string,
    shop: string,
    steps: number,
    date: string,
    proofUrl: string,
}

const emailRegex = /^(?<name>[a-zA-Z]+)(?<year>\d*)@/;

export default (req: NowRequest, res: NowResponse) => {
    if (typeof req.body !== 'object' || req.body == null) {
        res.status(400).send('Bad Request');
        return;
    }

    if (req.body.key !== process.env.WEBHOOK_KEY) {
        res.status(401).send('Unauthorized');
        return;
    }

    const body = req.body as Input;
    const email = emailRegex.exec(body.email);

    prisma.entry.create({
        data: {
            name: email?.groups?.name ?? 'error',
            year: parseInt(email?.groups?.year ?? '-1'),
            shop: getShop(body.shop),
            steps: body.steps ?? 0,
            date: new Date(body.date ?? 'error'),
            proofUrl: body.proofUrl ?? 'error',
        }
    });
};
