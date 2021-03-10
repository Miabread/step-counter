import { prisma } from "../lib/prisma";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { InferGetStaticPropsType } from "next";

export const getStaticProps = async () => {
    const query = await prisma.entry.aggregate({
        sum: {
            steps: true,
        },
    });

    return {
        props: { steps: query.sum.steps },
        revalidate: 60,
    };
};

export default function Index({ steps }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>Step Competition</title>
            </Head>
            <Link href="/shops">
                <a>by shops</a>
            </Link>
            <h1>{steps} steps</h1>
        </>
    );
}
