import React from 'react';
import { maxEntriesDisplayed, secInMinute, times } from '../../lib/data';
import { usePrisma } from '../../lib/prisma';
import { createStyle, getStaticPathsForView } from '../../lib/misc';
import css from './index.module.scss';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Total } from '../../components/Total';
import { SideBar } from '../../components/SideBar';
import { filterByTime } from '../../lib/time';
import { Steps } from '../../components/Steps';
import { DataHeader } from '../../components/DataHeader';
import Head from 'next/head';
import { War } from '../../components/War';

const style = createStyle(css);

export const getStaticPaths = getStaticPathsForView('faculty');

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const time = context.params?.time as keyof typeof times;

    const data = await usePrisma((prisma) =>
        prisma.entry.groupBy({
            by: ['name'],
            where: {
                year: 0,
                verified: true,
                ...filterByTime(time),
            },
            sum: { steps: true },
        }),
    );

    return {
        props: { data, time },
        revalidate: secInMinute,
    };
};

export default function Shops({
    data,
    time,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const faculty: Record<string, number> = {};

    for (const entry of data) {
        faculty[entry.name] = (faculty[entry.name] ?? 0) + entry.sum.steps;
    }

    const steps = Object.entries(faculty);

    // Sort students by decreasing steps
    steps.sort((a, b) => b[1] - a[1]);

    // Limit the amount of entries displayed
    steps.length = maxEntriesDisplayed;

    return (
        <div className={style('grid-container')}>
            <Head>
                <title>Top Faculty of {times[time]} | Step Into Action</title>
            </Head>
            <DataHeader />
            <SideBar currentView="faculty" currentTime={time} />
            <div className={style('main')}>
                <div className={style('table')}>
                    <War />
                    <Total input={data.map((it) => it.sum.steps)} />
                    <Steps input={steps} />
                </div>
            </div>
        </div>
    );
}
