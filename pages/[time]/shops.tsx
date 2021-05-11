import React, { useContext } from 'react';
import { minute, shops, times, years } from '../../lib/data';
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

const style = createStyle(css);

export const getStaticPaths = getStaticPathsForView('shops');

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const time = context.params?.time as keyof typeof times;

    const data = await usePrisma((prisma) =>
        Promise.all(
            years.map((year) =>
                prisma.entry.groupBy({
                    by: ['shop'],
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
        revalidate: minute,
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
        // Ignore the null shop
        .filter((_, i) => i !== 0);

    // Sort shops by decreasing steps
    steps.sort((a, b) => b[1] - a[1]);

    return (
        <div className={style('grid-container')}>
            <Head>
                <title>Top Shops of {times[time]} | Step Into Action</title>
            </Head>
            <DataHeader />
            <SideBar currentView="shops" currentTime={time} />
            <div className={style('main')}>
                <div className={style('table')}>
                    <Total input={filtered.map((it) => it.sum.steps)} />
                    <Steps input={steps} />
                </div>
            </div>
        </div>
    );
}
