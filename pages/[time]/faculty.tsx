import React, { Fragment } from 'react';
import { getRangeFromTime, minute, stringYears, times } from '../../lib/data';
import { usePrisma } from '../../lib/prisma';
import { createStyle } from '../../lib/css';
import css from './index.module.scss';
import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';
import { Checkboxes, useCheckbox } from '../../components/Checkboxes';
import { RadioLinks } from '../../components/RadioLinks';
import { Total } from '../../components/Total';

const style = createStyle(css);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: Object.keys(times).map((it) => `/${it}/faculty`),
        fallback: false,
    };
};

const filterByTime = (time: keyof typeof times) => {
    const timeRange = getRangeFromTime(time);

    // If 'all' then don't add a filter
    if (timeRange == null) return {};

    const gte = new Date(timeRange.start);
    const lte = new Date(timeRange.end);

    return {
        sumbitDate: {
            gte,
            lte,
        },
        date: {
            gte,
            lte,
        },
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const time = context.params?.time as keyof typeof times;
    const timeFilter = filterByTime(time);

    const data = await usePrisma((prisma) =>
        prisma.entry.groupBy({
            by: ['name'],
            where: {
                year: 0,
                verified: true,
                ...timeFilter,
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

    const radioOptions = Object.entries(times).map(([link, label]) => ({
        label,
        link: `/${link}/`,
    }));

    return (
        <div className={style('grid-container')}>
            <div className={style('top')}>
                <img
                    src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png"
                    alt="Not Header"
                    title="Not Header"
                />
            </div>
            <aside className={style('sidebar')}>
                <section>
                    <h3>Time</h3>
                    <RadioLinks options={radioOptions} selected={times[time]} />
                </section>
                <section>
                    <h3>Year</h3>
                    <Checkboxes
                        options={stringYears}
                        selected={yearFilter}
                        setSelected={setYearFilter}
                    />
                </section>
            </aside>
            <div className={style('main')}>
                <div className={style('table')}>
                    <Total input={data.map((it) => it.sum.steps)} />
                    {stepsDisplay}
                </div>
            </div>
        </div>
    );
}
