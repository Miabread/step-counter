import React, { Fragment } from 'react';
import { minute, stringYears, times } from '../../lib/data';
import { usePrisma } from '../../lib/prisma';
import { createStyle } from '../../lib/css';
import css from './index.module.scss';
import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';
import { useCheckbox } from '../../components/Checkboxes';
import { Total } from '../../components/Total';
import { SideBar } from '../../components/SideBar';
import { filterByTime } from '../../lib/time';

const style = createStyle(css);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: Object.keys(times).map((it) => `/${it}/faculty`),
        fallback: false,
    };
};

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
    const [yearFilter, setYearFilter] = useCheckbox(stringYears);

    const faculty: Record<string, number> = {};

    for (const entry of data) {
        faculty[entry.name] = (faculty[entry.name] ?? 0) + entry.sum.steps;
    }

    const steps = Object.entries(faculty);

    // Sort students by decreasing steps
    steps.sort((a, b) => b[1] - a[1]);

    const stepsDisplay = steps.map(([name, steps], key) => (
        <Fragment key={key}>
            <div className={style('index')}>{key + 1}</div>
            <div>{name}</div>
            <div className={style('content')}>{steps}</div>
        </Fragment>
    ));

    return (
        <div className={style('grid-container')}>
            <div className={style('top')}>
                <img
                    src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png"
                    alt="Not Header"
                    title="Not Header"
                />
            </div>
            <SideBar
                currentView="faculty"
                currentTime={time}
                yearFilter={yearFilter}
                setYearFilter={setYearFilter}
            />
            <div className={style('main')}>
                <div className={style('table')}>
                    <Total input={data.map((it) => it.sum.steps)} />
                    {stepsDisplay}
                </div>
            </div>
        </div>
    );
}
