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
                <title>Fitness Challenge</title>
            </Head>
            <article>
                <img src="https://i.ibb.co/GTqdQy3/logo.png" alt="Fitness Challenge" />
            </article>

            <div className="totalSteps">
                <div className="total">
                    <h1>Step Total {steps}</h1>
                </div>
            </div>
            <nav>
                <a href="/shops"><h1>Per Shop BreakDown</h1></a>
                <a href="https://forms.gle/YWFLzeHt1Qne4HEV6"><h1>Steps Form</h1></a>
            </nav>

            <footer>
                <hr />
                Logo Designer: Mylena Bovo &#8226; Programmers: James Clark, Wyatt Allaby
                <a href="http://assabet.org/"><img src="https://i.ibb.co/8cSkx4y/assabetlogo.jpg" alt="assabetlogo" /></a>
            </footer>

            <style jsx>{`
                article img {
                    width: 25%;
                    height: auto;
                    border: none;
                    margin-left: 39vw;
                    margin-top: 2vh;
                }

                img {
                    display: flex;
                    justify-content: left;
                    width: 5%;
                    height: auto;
                    border: none;
                    margin: 0% 0% 0% 1%;
                }

                footer {
                    text-align: center;
                    padding-top: 1em;
                    padding-bottom: 1em;
                    font-style: italic;
                }
                footer hr {
                    display: block;
                    text-align: center;
                    background-color: navy;
                    height: 0.2em;
                    width: 75vw
                }

                /* Centers whole box */
                .totalSteps {
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                }

                .total {
                    font-family: 'Anton', sans-serif;
                    border: 0.3em solid navy;
                    background-color: white;
                    width: 25%;
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
                    border: 0.3em solid navy;
                    background-color: white;
                    width: 27%;
                    height: auto;
                    margin: 5% 0% 0% 0%;
                }

                @media only screen and (max-width: 600px) {
                    .totalSteps {
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                    }

                    .total {
                    font-family: 'Anton', sans-serif;
                    border: 0.3em solid navy;
                    background-color: white;
                    width: 30%;
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
                    border: 0.3em solid navy;
                    background-color: white;
                    width: 40%;
                    height: auto;
                    margin: 5% 0% 0% 0%;
                    }
                }
            `}</style>
        </>
    );
}
