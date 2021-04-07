import React, { Fragment, useState } from 'react';
import {
    getRangeFromTime,
    minute,
    shops,
    stringYears,
    times,
    years,
} from '../../lib/data';
import { usePrisma } from '../../lib/prisma';
import { createStyle } from '../../lib/css';
import css from './index.module.scss';
import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';
import { Checkboxes, useCheckbox } from '../../components/Checkboxes';
import { Radios } from '../../components/Radios';

const style = createStyle(css);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: Object.keys(times).map((it) => `/${it}/`),
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
    const timeFilter = filterByTime(context.params?.time as keyof typeof times);

    const data = await usePrisma((prisma) =>
        Promise.all(
            years.map((year) =>
                prisma.entry.groupBy({
                    by: ['shop'],
                    where: {
                        year,
                        shop: { not: 0 },
                        verified: true,
                        ...timeFilter,
                    },
                    sum: { steps: true },
                }),
            ),
        ),
    );

    return {
        props: { data },
        revalidate: minute,
    };
};

export default function Shops({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [yearFilter, setYearFilter] = useCheckbox(stringYears);
    const [timeFilter, setTimeFilter] = useState(times.all);

    const filtered = data
        // Keep only years that are selected
        .filter((_, i) => yearFilter[years[i]])
        // We don't care about year info past this point
        .flat();

    const steps = filtered
        // Loop through all entries and count for each shop
        .reduce(
            (acc, it) => {
                // We own `acc`, mutation is fine
                acc[it.shop] += it.sum.steps;
                return acc;
            },
            // Make space for each shop with initial count 0
            shops.map(() => 0),
        )
        // Assuming order is the same as `shops`, pair the count with their shop's name
        .map((it, i) => [shops[i], it] as const)
        // Ignore any shops with 0 steps
        .filter((it) => it[1] > 0);

    // Sort shops by decreasing steps
    steps.sort((a, b) => b[1] - a[1]);

    const stepsDisplay = steps.map(([shop, steps], key) => (
        <Fragment key={key}>
            <div className={style('index')}>{key + 1}</div>
            <div>{shop}</div>
            <div className={style('content')}>{steps}</div>
        </Fragment>
    ));

    // For total just sum all of them
    const total = filtered.reduce((acc, it) => acc + it.sum.steps, 0);

    const totalDisplay = (
        <>
            <div className={style('index')}>+</div>
            <div>Total</div>
            <div className={style('content')}>{total}</div>{' '}
        </>
    );

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
                    <h3>Time WIP</h3>
                    <Radios
                        options={Object.values(times)}
                        selected={timeFilter}
                        setSelected={setTimeFilter}
                    />
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
                    {totalDisplay}
                    {stepsDisplay}
                </div>
            </div>
        </div>
    );
}
