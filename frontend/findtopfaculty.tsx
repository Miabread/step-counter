import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
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
                year: 0,
                date: {
                    gt: new Date(2021, 2, 12),
                    lt: new Date(2021, 2, 18),
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

export default function FindTopFaculty({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ul>
            <li>{JSON.stringify(data)}</li>
        </ul>
    );
}
