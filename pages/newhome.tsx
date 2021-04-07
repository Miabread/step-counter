import { usePrisma } from '../lib/prisma';
import Head from 'next/head';
import React from 'react';
import { InferGetStaticPropsType } from 'next';
import { Footer } from '../components/Footer';

export const getStaticProps = async () => {
    const query = await usePrisma((prisma) =>
        prisma.entry.aggregate({
            where: {
                verified: true,
            },
            sum: {
                steps: true,
            },
        }),
    );

    return {
        props: { steps: query.sum.steps },
        revalidate: 60,
    };
};

export default function Index({
    steps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className="main">
            <Head>
                <title>Fitness Challenge</title>
            </Head>
            <nav className="top">
                <img
                    src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png"
                    alt="Fitness Challenge"
                />
                <a href="https://forms.gle/YWFLzeHt1Qne4HEV6">
                    <h1>Submit Form</h1>
                </a>
                <a href="/shops">
                    <h1>View # of Steps by Shop</h1>
                </a>
                <a href="/faculty">
                    <h1>Faculty Page</h1>
                </a>
            </nav>

            <article className="main">
                <h1>School Total {steps}</h1>
            </article>

            <Footer />
            <style jsx>{`
                .top {
                    border: none;
                    background-color: #edbd3e;
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                    height: 30vh;
                }

                .top img {
                    width: 19%;
                    height: auto;
                }

                .main {
                    background-color: #cfd6df;
                    margin: auto;
                    display: flex;
                    flex-flow: column;
                }
            `}</style>
        </div>
    );
}
