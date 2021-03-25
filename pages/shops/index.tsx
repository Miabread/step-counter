import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { ShopEntries } from '../../components/ShopEntries';
import { Footer } from '../../components/Footer';
import { ShopHeader } from '../../components/ShopHeader';
import { usePrisma } from '../../lib/prisma';
import { createCount } from '../../lib/data';

export const getStaticProps = async () => {
    // Sum the steps of all shops excluding faculty
    const query = await usePrisma((prisma) =>
        prisma.entry.groupBy({
            by: ['shop'],
            where: { year: { not: 0 }, shop: { not: 0 }, verified: true },
            sum: { steps: true },
        }),
    );

    // Prepare a count for each shop
    const steps = createCount();

    // Count all query results
    for (const { shop, sum } of query) {
        steps[shop] += sum.steps;
    }

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
