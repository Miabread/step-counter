//all imports from other files
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

// how we initiate the HTML code
export default function Index({ steps }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>Fitness Challenge</title>
            </Head>
            <article>
                <img src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png" alt="Fitness Challenge" />
            </article>

            <div className="totalSteps">
                <div className="total">
                    <h1>Step Total {steps}</h1> {/* Where we pull the total steps from db */}
                </div>
            </div>
            <nav>
                <a href="/shops"><h1>Per Shop BreakDown</h1></a> {/* These add links to other pages */}
                <a href="https://forms.gle/YWFLzeHt1Qne4HEV6"><h1>Steps Form</h1></a>
            </nav>

            <footer>
                <hr />
                Logo Designer: Mylena Bovo &#8226; Programmers: James Clark, Wyatt Allaby
                <a href="http://assabet.org/"><img src="https://i.ibb.co/8cSkx4y/assabetlogo.jpg" alt="assabetlogo" /></a>
            </footer>

            <style jsx>{`
                article img { /*Code for the step logo*/
                    width: 25%;
                    height: auto;
                    border: none;
                    margin-left: 39vw;
                    margin-top: 2vh;
                }

                img { /*Logo for Assabet*/
                    display: flex;
                    justify-content: left;
                    width: 5%;
                    height: auto;
                    border: none;
                    margin: 0% 0% 0% 1%;
                }

                footer { /*All footer styles are just used to customize the footer tag*/
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
                .totalSteps { /*Design for the total steps box and position*/
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

                nav { /* this is also for the links and their boxes */
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

                @media only screen and (max-width: 600px) { /*This is the filter to check if the screen is 600px or less*/
                    .totalSteps {
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                    }

                    .total {
                    font-family: 'Anton', sans-serif;
                    border: 0.3em solid navy;
                    background-color: white;
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
                    border: 0.3em solid navy;
                    background-color: white;
                    width: 50%; /*This is the size for a phone*/
                    height: auto;
                    margin: 5% 0% 0% 0%;
                    }
                }
            `}</style>
        </>
    );
}
