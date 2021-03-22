import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { ShopEntries } from '../../components/ShopEntries';
import { Footer } from '../../components/Footer';
import { ShopHeader } from '../../components/ShopHeader';
import { usePrisma } from '../../lib/prisma';
import { shops } from '../../lib/data';

export const getStaticProps = async () => {
    const query = await usePrisma((prisma) =>
        prisma.entry.groupBy({
            by: ['shop'],
            where: { year: { not: 0 } },
            sum: { steps: true },
        }),
    );

    const shopSteps = Object.fromEntries(
        query.map((it) => [it.shop, it.sum.steps]),
    );
    const steps = shops.map((_, it) => shopSteps[it] ?? 0);

    return {
        props: { steps },
        revalidate: 60,
    };
};

export default function Index({
    steps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <ShopHeader page="" />
            <ShopEntries data={steps} label="Steps" />
            <Footer />
            <style jsx>{`
                div {
                    display: grid;
                    grid-template-rows: auto 1fr auto;
                    min-height: 100vh;
                }
            `}</style>
        </div>
    );
}
