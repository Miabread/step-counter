import { usePrisma } from '../../lib/prisma';
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

const parseInteger = (input = '0') => {
    const result = parseInt(input, 10);
    if (!Number.isInteger(result)) return 0;
    return result;
};

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

    const data = {
        // Strings
        name: email?.groups?.name ?? 'error',
        proofUrl: body.proofUrl ?? 'error',
        date: new Date(body.date ?? 'error'),

        // Integers
        steps: parseInteger(email?.groups?.year),
        year: parseInteger(body.steps),

        // Enum
        shop: shops.findIndex((shop) => shop === body.shop),
    };

    await usePrisma((prisma) => prisma.entry.create({ data }));

    res.status(200).send('Created');
};
