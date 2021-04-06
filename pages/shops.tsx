import React, { ChangeEvent, Fragment, useState } from 'react';
import { shops, stringYears, times, years } from '../lib/data';
import { usePrisma } from '../lib/prisma';
import { createStyle } from '../lib/css';
import css from './shops.module.scss';
import { InferGetStaticPropsType } from 'next';
import { Checkboxes, useCheckbox } from '../components/Checkboxes';

const style = createStyle(css);

export const getStaticProps = async () => {
    const data = await usePrisma((prisma) =>
        Promise.all(
            years.map((year) =>
                prisma.entry.groupBy({
                    by: ['shop'],
                    where: { year, shop: { not: 0 }, verified: true },
                    sum: { steps: true },
                }),
            ),
        ),
    );

    return {
        props: { data },
        revalidate: 60,
    };
};

type Index<T extends readonly any[]> = T[Exclude<keyof T, keyof any[]>];

export default function Shops({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [yearFilter, setYearFilter] = useCheckbox(stringYears);
    const [timeFilter, setTimeFilter] = useState<Index<typeof times>>(times[0]);

    const steps = data
        // Keep only years that are selected
        .filter((_, i) => yearFilter[years[i]])
        // We don't care about year info past this point
        .flat()
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

    const radios = times.map((time, key) => (
        <div key={key}>
            <input
                type="radio"
                id={time}
                name={time}
                checked={timeFilter === time}
                onChange={() => setTimeFilter(time)}
            />
            <label htmlFor={time}>{time}</label>
        </div>
    ));

    return (
        <div className={style('grid-container')}>
            <div className={style('top')}>Header</div>
            <aside className={style('sidebar')}>
                <h3>Time WIP</h3>
                {radios}
                <h3>Year</h3>
                <Checkboxes
                    input={stringYears}
                    checked={yearFilter}
                    setChecked={setYearFilter}
                />
            </aside>
            <div className={style('main')}>
                <div className={style('table')}>{stepsDisplay}</div>
            </div>
        </div>
    );
}
