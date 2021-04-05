import { usePrisma } from '../../lib/prisma';
import { shopToIndex, shops } from '../../lib/data';
import { handleErrors } from '../../lib/error';
import ow from 'ow';

const emailRegex = /^(?<name>[a-zA-Z-]+)(?<year>\d*)@/;
const nameRegex = /^[a-zA-Z-]+$/;

const maxSteps = 1_000_000;
const maxYear = 2050;
const startDate = new Date(2021, 2, 12);

const now = () => new Date();

export default handleErrors(async (req, res) => {
    ow(
        req.body,
        ow.object.exactShape({
            key: ow.string.equals(process.env.GOOGLE_SECRET ?? ''),
            email: ow.string.matches(emailRegex),
            proofUrl: ow.string.nonEmpty,
            date: ow.string.nonEmpty.date,
            steps: ow.string.nonEmpty.numeric,
            shop: ow.string.oneOf(shops),
        }),
    );

    const email = emailRegex.exec(req.body.email);
    const date = new Date(req.body.date);

    // Temporary fix for issue #3
    if (date.getFullYear() === 21) date.setFullYear(2021);

    const data = {
        name: email?.groups?.name,
        proofUrl: req.body.proofUrl,
        date,
        steps: parseInt(req.body.steps, 10),
        // `or` is used to also catch empty strings
        year: parseInt(email?.groups?.year || '0', 10),
        shop: shopToIndex(req.body.shop),
    };

    ow(
        data,
        ow.object.exactShape({
            name: ow.string.nonEmpty.matches(nameRegex),
            proofUrl: ow.string.nonEmpty,
            date: ow.date.after(startDate).before(now()),
            steps: ow.number.integer.inRange(0, maxSteps),
            year: ow.number.integer.inRange(0, maxYear),
            shop: ow.number.integer.inRange(0, shops.length),
        }),
    );

    await usePrisma((prisma) => prisma.entry.create({ data }));

    res.status(200).send('Created');
});
