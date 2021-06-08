import React, { useContext } from 'react';
import { secInMinute, shops, times, years } from '../../lib/data';
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

export const getStaticPaths = getStaticPathsForView('users');

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const time = context.params?.time as keyof typeof times;

    const { shopsQuery, facultyQuery } = await usePrisma(async (prisma) => ({
        shopsQuery: await Promise.all(
            years.map((year) =>
                prisma.entry.findMany({
                    select: {
                        shop: true,
                        steps: true,
                        year: true,
                        name: true,
                    },
                    distinct: ['name', 'year'],
                    where: { year, ...filterByTime(time) },
                }),
            ),
        ),
        facultyQuery: await prisma.entry.findMany({
            select: { steps: true, year: true, name: true },
            distinct: ['name', 'year'],
            where: { year: 0, ...filterByTime(time) },
        }),
    }));

    // Prepare a count for each shop for each year
    const data = years.map(() => shops.map((_, i) => [i, 0]));

    for (const [i, yearEntries] of shopsQuery.entries()) {
        for (const { shop } of yearEntries) {
            data[i][shop][1] += 1;
        }
    }

    // Count number of faculty
    const faculty = facultyQuery.length;

    return {
        props: { data, time, faculty },
        revalidate: secInMinute,
    };
};

export default function Users({
    data,
    time,
    faculty,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [yearFilter] = useContext(yearFilterContext);

    const filtered = data
        // Keep only years that are selected
        .filter((_, i) => yearFilter[years[i]])
        // We don't care about year info past this point
        .flat();

    const users = filtered
        // Loop through all entries and count for each shop
        .reduce(
            (acc, [i, it]) => {
                // We own `acc`, mutation is fine
                acc[i] += it;
                return acc;
            },
            // Make space for each shop with initial count 0
            shops.map(() => 0),
        )
        // Assuming order is the same as `shops`, pair the count with their shop's name
        .map((it, i) => [shops[i], it] as const)
        // Ignore the null shop
        .filter((_, i) => i !== 0);

    // Sort shops by decreasing users
    users.sort((a, b) => b[1] - a[1]);

    return (
        <div className={style('grid-container', 'for-users')}>
            <Head>
                <title>Top Users of {times[time]} | Step Into Action</title>
            </Head>
            <DataHeader />
            <SideBar currentView="users" currentTime={time} />
            <div className={style('main')}>
                <div className={style('table')}>
                    <Total input={faculty} label="Total Faculty" />
                    <Total
                        input={filtered.map((it) => it[1])}
                        label="Total Students"
                    />
                    <Steps input={users} />
                </div>
            </div>
        </div>
    );
}
