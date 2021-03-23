import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { Footer } from '../components/Footer';
import { usePrisma } from '../lib/prisma';

export const getStaticProps = async () => {
    const props = await usePrisma(async (prisma) => {
        // Sum all steps of faculty
        const steps = await prisma.entry.aggregate({
            where: { year: 0 },
            sum: {
                steps: true,
            },
        });

        // Count all unique faculty
        const users = await prisma.entry.findMany({
            distinct: ['name'],
            where: { year: 0 },
        });

        return { steps: steps.sum.steps, users: users.length };
    });

    return {
        props,
        revalidate: 60,
    };
};

export default function Index({
    steps,
    users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <p>{steps}</p>
            <p>{users}</p>
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
