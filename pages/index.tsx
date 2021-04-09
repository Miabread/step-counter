import { usePrisma } from '../lib/prisma';
import Head from 'next/head';
import React from 'react';
import { InferGetStaticPropsType } from 'next';
import { minute } from '../lib/data';
import Link from 'next/link';

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
        revalidate: minute,
    };
};

export default function Index({
    steps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>Step Into Action</title>
            </Head>
            <article>
                <img
                    src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png"
                    alt="Step Into Action"
                    title="Step Into Action"
                />
            </article>

            <div className="totalSteps">
                <div className="total">
                    <h1>School Total</h1>
                    <h2>{steps.toLocaleString()} Steps</h2>
                </div>
            </div>
            <nav>
                <Link href="/all/shops">
                    <a>
                        <h1>Data Breakdown</h1>
                    </a>
                </Link>
                <Link href="https://forms.gle/YWFLzeHt1Qne4HEV6">
                    <a>
                        <h1>Submit Steps</h1>
                    </a>
                </Link>
            </nav>
            <Link href="http://assabet.org/cms/one.aspx?pageId=36650809">
                <a>
                    <img
                        src="https://i.ibb.co/6JgpjHw/assabetlogo.jpg"
                        alt="Assabet Logo"
                    />
                </a>
            </Link>
            <style jsx>{`
                article img {
                    /*Code for the step logo*/
                    width: 25%;
                    height: auto;
                    border: none;
                    margin-left: 39vw;
                    margin-top: 2vh;
                }

                img {
                    /*Logo for Assabet*/
                    display: flex;
                    justify-content: left;
                    width: 5%;
                    height: auto;
                    border: none;
                    margin: 0% 0% 0% 1%;
                }

                /* Centers whole box */
                .totalSteps {
                    /*Design for the total steps box and position*/
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                }

                .total {
                    font-family: 'Anton', sans-serif;
                    border: 0.3em solid #185fac;
                    background-color: #fff36d;
                    width: 25%;
                    height: auto;
                    margin: 5% 0% 0% 0%;
                }

                nav {
                    /* this is also for the links and their boxes */
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                }

                nav a {
                    font-family: 'Anton', sans-serif;
                    border: 0.3em solid #185fac;
                    background-color: #fff36d;
                    width: 27%;
                    height: auto;
                    margin: 5% 0% 0% 0%;
                }

                @media only screen and (max-width: 600px) {
                    /*This is the filter to check if the screen is 600px or less*/
                    .totalSteps {
                        display: flex;
                        justify-content: space-around;
                        text-align: center;
                    }

                    .total {
                        font-family: 'Anton', sans-serif;
                        border: 0.3em solid #185fac;
                        background-color: #fff36d;
                        width: 40%; /*This is the size for a phone*/
                        height: auto;
                        margin: 5% 0% 0% 0%;
                    }

                    nav {
                        display: flex;
                        justify-content: space-around;
                        text-align: center;
                    }

                    nav a {
                        font-family: 'Anton', sans-serif;
                        border: 0.3em solid #185fac;
                        background-color: #fff36d;
                        width: 50%; /*This is the size for a phone*/
                        height: auto;
                        margin: 5% 0% 0% 0%;
                    }
                }
            `}</style>
        </>
    );
}
