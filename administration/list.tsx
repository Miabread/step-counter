import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { usePrisma } from '../lib/prisma';

export const getStaticProps = async () => {
    // Prisma can't `distinct` and `groupBy` at the same time so we do it manually
    const query = await usePrisma((prisma) =>
        prisma.entry.findMany({
            select: {
                shop: true,
                name: true,
                year: true,
            },
            distinct: ['name', 'year'],
        }),
    );

    return {
        props: {},
        revalidate: 60,
    };
};

export default function List(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    return (
        <ol>
            <li>{props}</li>
        </ol>
    );
}
