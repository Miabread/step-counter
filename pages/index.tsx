import { InferGetStaticPropsType } from 'next';
import React from 'react';
import Entries from '../components/Entries';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { prisma } from '../lib/prisma';
import { shops } from '../lib/shop';

export const getStaticProps = async () => {
    const query = await prisma.entry.groupBy({
        by: ['shop'],
        sum: { steps: true },
    });

    const shopSteps = Object.fromEntries(query.map(it => [it.shop, it.sum.steps]));
    const steps = shops.map((_, it) => shopSteps[it] ?? 0);

    return {
        props: { steps },
        revalidate: 60,
    };
};

export default function Index({ steps }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <div>
        <Header />
        <Entries steps={steps} />
        <Footer />
        <style jsx>{`
            div {
                display: grid;
                grid-template-rows: auto 1fr auto;
                min-height: 100vh;
            }
        `}</style>
    </div>;
}
