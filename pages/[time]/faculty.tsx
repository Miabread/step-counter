import React, { useContext } from 'react';
import { maxEntriesDisplayed, minute, times } from '../../lib/data';
import { usePrisma } from '../../lib/prisma';
import { createStyle, getStaticPathsForView } from '../../lib/misc';
import css from './index.module.scss';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Total } from '../../components/Total';
import { SideBar } from '../../components/SideBar';
import { filterByTime } from '../../lib/time';
import { Steps } from '../../components/Steps';
import { DataHeader } from '../../components/DataHeader';
import { yearFilterContext } from '../_app';

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
        revalidate: minute,
    };
};

export default function Shops({
    data,
    time,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [yearFilter, setYearFilter] = useContext(yearFilterContext);

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
            <DataHeader />
            <SideBar
                currentView="faculty"
                currentTime={time}
                yearFilter={yearFilter}
                setYearFilter={setYearFilter}
            />
            <div className={style('main')}>
                <div className={style('table')}>
                    <Total input={data.map((it) => it.sum.steps)} />
                    <Steps input={steps} />
                </div>
            </div>
        </div>
    );
}
