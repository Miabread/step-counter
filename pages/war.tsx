import { usePrisma } from '../lib/prisma';
import Head from 'next/head';
import React from 'react';
import { InferGetStaticPropsType } from 'next';
import { filterByTime } from '../lib/time';
import { DataHeader } from '../components/DataHeader';
import { createStyle } from '../lib/misc';
import css from './war.module.scss';

const style = createStyle(css);

export const getStaticProps = async () => {
    const [cpwd, health] = await usePrisma(async (prisma) =>
        Promise.all([
            prisma.entry.aggregate({
                where: {
                    year: { not: 0 },
                    shop: 6,
                    verified: true,
                    ...filterByTime('all'),
                },
                sum: { steps: true },
            }),
            prisma.entry.aggregate({
                where: {
                    year: { not: 0 },
                    shop: 14,
                    verified: true,
                    ...filterByTime('all'),
                },
                sum: { steps: true },
            }),
        ]),
    );

    return {
        props: { cpwd, health },
        revalidate: 60,
    };
};

export default function War({
    cpwd,
    health,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [cpwdDiff, healthDiff] =
        cpwd.sum.steps > health.sum.steps
            ? [
                  (cpwd.sum.steps - health.sum.steps).toLocaleString() +
                      ' Ahead',
                  (cpwd.sum.steps - health.sum.steps).toLocaleString() +
                      ' Behind',
              ]
            : [
                  (health.sum.steps - cpwd.sum.steps).toLocaleString() +
                      ' Behind',
                  (health.sum.steps - cpwd.sum.steps).toLocaleString() +
                      ' Ahead',
              ];

    return (
        <div className={style('grid-container')}>
            <Head>
                <title>War | Step Into Action</title>
            </Head>
            <DataHeader />
            <div className={style('left', 'center')}>
                <h1>CPWD</h1>
                <h2>{cpwd.sum.steps.toLocaleString()}</h2>
                <h3>{cpwdDiff}</h3>
            </div>
            <div className={style('right', 'center')}>
                <h1>Health Tech</h1>
                <h2>{health.sum.steps.toLocaleString()}</h2>
                <h3>{healthDiff}</h3>
            </div>
        </div>
    );
}
