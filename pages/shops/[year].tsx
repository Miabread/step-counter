import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ShopEntries } from '../../components/ShopEntries';
import { Footer } from '../../components/Footer';
import { ShopHeader } from '../../components/ShopHeader';
import { usePrisma } from '../../lib/prisma';
import { years, createCount } from '../../lib/data';

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: years.map((y) => `/shops/${y}`),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const year = parseInt(context.params?.year as string, 10);

    // Sum the steps of all shops including only the specified year
    const query = await usePrisma((prisma) =>
        prisma.entry.groupBy({
            by: ['shop'],
            where: { year, shop: { not: 0 }, verified: true },
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
    const router = useRouter();

    return (
        <div>
            <ShopHeader page={router.query.year as string} />
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
