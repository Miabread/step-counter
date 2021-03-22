import { closeIfProd, prisma } from '../../lib/prisma';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { shops } from '../../lib/data';

interface Input {
    email: string;
    shop: string;
    steps: string;
    date: string;
    proofUrl: string;
}

const emailRegex = /^(?<name>[a-zA-Z]+)(?<year>\d*)@/;

export default async (req: VercelRequest, res: VercelResponse) => {
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

    let steps = parseInt(body.steps ?? '0', 10);
    if (!Number.isInteger(steps)) steps = 0;

    let year = parseInt(email?.groups?.year ?? '0', 10);
    if (!Number.isInteger(year)) year = 0;

    const data = {
        name: email?.groups?.name ?? 'error',
        year,
        shop: shops.findIndex((shop) => shop === body.shop),
        steps,
        date: new Date(body.date ?? 'error'),
        proofUrl: body.proofUrl ?? 'error',
    };

    await prisma.entry.create({ data });

    res.status(200).send('Created');

    await closeIfProd();
};
