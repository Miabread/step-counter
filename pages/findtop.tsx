import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { equal } from 'node:assert';
// import { stringify } from 'node:querystring';
import React from 'react';
import { usePrisma } from '../lib/prisma';

//this is for when you want to change the week you are on
const beginDay = 26; //pass in the day that you started
const beginMonth = 4; //pass in the month that you are currently in
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
                year: 0, //0 is searching for only faculty, change this to be {not: 0} when looking for students
                verified: true, //only if they are verified
                sumbitDate: {
                    //parameter for the submit date
                    gte: new Date(
                        beginYear,
                        beginMonth - 1,
                        beginDay - 1,
                        20,
                        0,
                        0,
                    ), //too change year or day change the created objects named beginYear/beginDay
                    lte: new Date(
                        beginYear,
                        beginMonth - 1,
                        beginDay + 6,
                        20,
                        0,
                        0,
                    ),
                },
                date: {
                    //parameter for the date the steps want to be counted
                    gte: new Date(
                        beginYear,
                        beginMonth - 1,
                        beginDay - 1,
                        20,
                        0,
                        0,
                    ),
                    lte: new Date(
                        beginYear,
                        beginMonth - 1,
                        beginDay + 6,
                        20,
                        0,
                        0,
                    ),
                },
            },
        }),
    );

    query.sort((a, b) => b.sum.steps - a.sum.steps); //This is how we get them in order of greatest to lowest
    query.length = 10; //top 10 results

    return {
        props: {
            data: query, //returns our query
        },
        revalidate: 60, //checks the data every 60 seconds
    };
};

export default function FindTop({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ul>
            {/* this is what displays the data on the webpage */}
            <li>{JSON.stringify(data)}</li>
        </ul>
    );
}
