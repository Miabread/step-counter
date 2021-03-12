import { InferGetStaticPropsType } from 'next';
import React from 'react';
import Entries from '../../components/Entries';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { closeIfProd, prisma } from '../../lib/prisma';
import { shops } from '../../lib/shop';

export const getStaticProps = async () => {
    // Prisma can't `distinct` and `groupBy` at the same time so we do it manually
    const query = await prisma.entry.findMany({
        select: {
            shop: true,
            name: true,
            year: true,
        },
        distinct: ['name', 'year'],
    });

    await closeIfProd();

    const users = shops.map((_) => 0);

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
            <Header page="users" />
            <Entries data={users} label="Participants" />
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
