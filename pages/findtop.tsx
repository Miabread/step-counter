import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { equal } from 'node:assert';
// import { stringify } from 'node:querystring';
import React from 'react';
import { usePrisma } from '../lib/prisma';

//this is for when you want to change the week you are on
const beginDay = 28; //pass in the day that you started
const beginYear = 2021; //pass in the year you are on

export const getStaticProps = async () => {
    // Prisma can't `distinct` and `groupBy` at the same time so we do it manually
    const query = await usePrisma((prisma) =>
        //Where I start to give all the perameters for the code
        prisma.entry.groupBy({
            by: ['name', 'year'],
            sum: {
                steps: true,
            },
            where: {
                year: { not: 0 },
                verified: true,
                sumbitDate: {
                    //look for the beginYear to change the date
                    gte: new Date(beginYear, 2, beginDay - 1, 20, 0, 0),
                    lte: new Date(beginYear, 2, beginDay + 7, 20, 0, 0),
                },
                date: {
                    gte: new Date(beginYear, 2, beginDay - 1, 20, 0, 0),
                    lte: new Date(beginYear, 2, beginDay + 7, 20, 0, 0),
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
