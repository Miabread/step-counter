import React, { useState } from 'react';
import { shops, years } from '../lib/data';
import { usePrisma } from '../lib/prisma';
import { createStyle } from '../lib/css';
import css from './shops.module.css';
import { InferGetStaticPropsType } from 'next';

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

export default function Shops({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [selection, setSelection] = useState<Record<string, boolean>>({});

    const steps = data
        // Keep only years that are selected
        .filter((_, i) => selection[years[i]])
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
        <React.Fragment key={key}>
            <dt>{shop}</dt>
            <dd>{steps}</dd>
        </React.Fragment>
    ));

    const checkboxes = years.map((year, i) => (
        <React.Fragment key={i}>
            <input
                type="checkbox"
                id={String(year)}
                name={String(year)}
                checked={selection[year]}
                onChange={(event) =>
                    setSelection({
                        ...selection,
                        [year]: event.target.checked,
                    })
                }
            />
            <label htmlFor={String(year)}>{year}</label>
        </React.Fragment>
    ));

    return (
        <div className={style('grid-container')}>
            <div className={style('top')}></div>
            <aside className={style('sidebar')}>{checkboxes}</aside>
            <dl className={style('main')}>{stepsDisplay}</dl>
        </div>
    );
}
