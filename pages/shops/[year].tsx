import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Entries from '../../components/Entries';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { prisma } from '../../lib/prisma';
import { shops, years } from '../../lib/shop';

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: years.map((y) => `/shops/${y}`),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const year = parseInt(context.params?.year as string, 10);

    const query = await prisma.entry.groupBy({
        by: ['shop'],
        where: { year },
        sum: { steps: true },
    });

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
    const router = useRouter();

    return (
        <div>
            <Header page={router.query.year as string} />
            <Entries data={steps} label="Steps" />
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
