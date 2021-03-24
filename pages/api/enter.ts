import { usePrisma } from '../../lib/prisma';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { shopToIndex } from '../../lib/data';

interface Input {
    email?: string;
    shop?: string;
    steps?: string;
    date?: string;
    proofUrl?: string;
}

const emailRegex = /^(?<name>[a-zA-Z]+)(?<year>\d*)@/;

const reportError = async (req: VercelRequest, res: VercelResponse) => {
    const message = {
        embeds: [
            {
                description:
                    '```json\n' + JSON.stringify(req.body, null, 2) + '```',
                color: 13704477,
                timestamp: new Date().toISOString(),
                image: {
                    url: `https://drive.google.com/file/d/${req.body.proofUrl}/view`,
                },
            },
        ],
    };

    try {
        await fetch(process.env.WEBHOOK_URL ?? '', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        res.status(200).send('Handled');
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal server error');
    }
};

export default async (req: VercelRequest, res: VercelResponse) => {
    if (typeof req.body !== 'object' || req.body == null) {
        return reportError(req, res);
    }

    if (req.body.key !== process.env.WEBHOOK_KEY) {
        res.status(401).send('Unauthorized');
        return;
    }

    const body = req.body as Input;

    if (
        body.email == null ||
        body.proofUrl == null ||
        body.date == null ||
        body.steps == null ||
        body.shop == null
    ) {
        return reportError(req, res);
    }

    const email = emailRegex.exec(body.email);

    if (email?.groups?.name == null || email.groups.year == null) {
        return reportError(req, res);
    }

    const name = email.groups.name;

    const proofUrl = body.proofUrl;
    const date = new Date(body.date);

    const year = parseInt(email.groups.year, 10);
    const steps = parseInt(body.steps, 10);

    const shop = shopToIndex(body.shop);

    if (
        !Number.isInteger(year) ||
        year < 0 ||
        !Number.isInteger(steps) ||
        steps < 0 ||
        shop == null
    ) {
        return reportError(req, res);
    }

    const data = {
        name,
        proofUrl,
        date,
        steps,
        year,
        shop,
    };

    await usePrisma((prisma) => prisma.entry.create({ data }));

    res.status(200).send('Created');
};
