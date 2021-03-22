import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { ShopEntries } from '../../components/ShopEntries';
import { Footer } from '../../components/Footer';
import { ShopHeader } from '../../components/ShopHeader';
import { usePrisma } from '../../lib/prisma';
import { shops } from '../../lib/data';

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
            where: { year: { not: 0 } },
        }),
    );

    // Prepare a count for each shop
    const users = shops.map((_) => 0);

    // Count all query results
    for (const { shop } of query) {
        users[shop] += 1;
    }

    return {
        props: { users },
        revalidate: 60,
    };
};

export default function Users({
    users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <ShopHeader page="users" />
            <ShopEntries data={users} label="Students" />
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
