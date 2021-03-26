import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { equal } from 'node:assert';
// import { stringify } from 'node:querystring';
import React from 'react';
import { usePrisma } from '../lib/prisma';

export const getStaticProps = async () => {
    // Prisma can't `distinct` and `groupBy` at the same time so we do it manually
    const query = await usePrisma((prisma) =>
        prisma.entry.groupBy({
            by: ['name', 'year'],
            sum: {
                steps: true,
            },
            where: {
                year: { not: 0 },
                verified: true,
                // name: 'emillyfaria',
                sumbitDate: {
                    gte: new Date(2021, 2, 18, 20, 0, 0),
                    lte: new Date(2021, 2, 26, 20, 0, 0),
                },
                date: {
                    gte: new Date(2021, 2, 18, 20, 0, 0),
                    lte: new Date(2021, 2, 26, 20, 0, 0),
                },
            },
        }),
    );

    query.sort((a, b) => b.sum.steps - a.sum.steps);
    query.length = 10;

    return {
        props: {
            data: query,
        },
        revalidate: 60,
    };
};

export default function FindTop({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ul>
            <li>{JSON.stringify(data)}</li>
        </ul>
    );
}
