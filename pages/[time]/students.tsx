import React, { useContext } from 'react';
import { maxEntriesDisplayed, secInMinute, times, years } from '../../lib/data';
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
import { yearFilterContext } from '../../components/YearFilter';
import { War } from '../../components/War';

const style = createStyle(css);

export const getStaticPaths = getStaticPathsForView('students');

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const time = context.params?.time as keyof typeof times;

    const data = await usePrisma((prisma) =>
        Promise.all(
            years.map((year) =>
                prisma.entry.groupBy({
                    by: ['name', 'year'],
                    where: {
                        year,
                        shop: { not: 0 },
                        verified: true,
                        ...filterByTime(time),
                    },
                    sum: { steps: true },
                }),
            ),
        ),
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
    const [yearFilter] = useContext(yearFilterContext);

    const filtered = data
        // Keep only years that are selected
        .filter((_, i) => yearFilter[years[i]])
        // We don't care about year info past this point
        .flat();

    const students: Record<string, number> = {};

    for (const entry of filtered) {
        const student = entry.name + entry.year;
        students[student] = (students[student] ?? 0) + entry.sum.steps;
    }

    const steps = Object.entries(students);

    // Sort students by decreasing steps
    steps.sort((a, b) => b[1] - a[1]);

    // Limit the amount of entries displayed
    steps.length = maxEntriesDisplayed;

    return (
        <div className={style('grid-container')}>
            <Head>
                <title>Top Students of {times[time]} | Step Into Action</title>
            </Head>
            <DataHeader />
            <SideBar currentView="students" currentTime={time} />
            <div className={style('main')}>
                <div className={style('table')}>
                    <War />
                    <Total input={filtered.map((it) => it.sum.steps)} />
                    <Steps input={steps} />
                </div>
            </div>
        </div>
    );
}
