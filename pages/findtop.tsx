import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { equal } from 'node:assert';
// import { stringify } from 'node:querystring';
import React from 'react';
import { usePrisma } from '../lib/prisma';

//this is for when you want to change the week you are on
const beginDay = 19; //pass in the day that you started
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
                // name: 'emillyfaria',
                sumbitDate: {
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

// const items = json3.items;
// const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
// const header = Object.keys(items[0]);
// const csv = [
//     header.join(','), // header row first
//     ...items.map((row) =>
//         header.map((data) => JSON.stringify(row[data], replacer)).join(','),
//     ),
// ].join('\r\n');

// console.log(csv);

export default function FindTop({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ul>
            <li>{JSON.stringify(data)}</li>
        </ul>
    );
}
