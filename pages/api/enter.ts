// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../lib/prisma";
import { NowRequest, NowResponse } from '@vercel/node';
import { shops } from "../../lib/shop";

interface Input {
    email: string,
    shop: string,
    steps: string,
    date: string,
    proofUrl: string,
}

const emailRegex = /^(?<name>[a-zA-Z]+)(?<year>\d*)@/;

export default async (req: NowRequest, res: NowResponse) => {
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

    let steps = parseInt(body.steps ?? '0');
    if (!Number.isInteger(steps)) steps = 0;

    const data = {
        name: email?.groups?.name ?? 'error',
        year: parseInt(email?.groups?.year ?? '0', 10),
        shop: shops.findIndex(shop => shop === body.shop),
        steps: parseInt(body.steps ?? '0'),
        date: new Date(body.date ?? 'error'),
        proofUrl: body.proofUrl ?? 'error',
    };

    await prisma.entry.create({ data });

    res.status(200).send('Created');
};
