import { VercelRequest, VercelResponse } from '@vercel/node';

type Handle = (req: VercelRequest, res: VercelResponse) => Promise<unknown>;

const codeBlock = (lang: string, input: string) =>
    '```' + `${lang}\n${input}` + '```';

const createMessage = (
    error: unknown,
    body: unknown,
    proofUrl = 'unknown',
) => ({
    embeds: [
        {
            description: `${error}\n${codeBlock(
                'json',
                JSON.stringify(body, null, 2),
            )}`,
            color: 13704477,
            timestamp: new Date().toISOString(),
            image: {
                url: `https://drive.google.com/file/d/${proofUrl}/view`,
            },
        },
    ],
});

const sendMessage = (message: unknown) =>
    fetch(process.env.WEBHOOK_URL ?? '', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'Content-Type': 'application/json',
        },
    });

const reportError = async (
    error: unknown,
    req: VercelRequest,
    res: VercelResponse,
) => {
    try {
        await sendMessage(createMessage(error, req.body, req.body.proofUrl));
        res.status(200).send('Handled');
    } catch (e: unknown) {
        console.error(e);
        res.status(500).send('Internal server error');
    }
};

export const handleErrors = (handle: Handle): Handle => async (req, res) => {
    try {
        return await handle(req, res);
    } catch (e: unknown) {
        await reportError(e, req, res);
    }
};
