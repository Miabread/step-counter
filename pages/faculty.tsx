import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { Footer } from '../components/Footer';
import { usePrisma } from '../lib/prisma';

export const getStaticProps = async () => {
    const props = await usePrisma(async (prisma) => {
        // Sum all steps of faculty
        const steps = await prisma.entry.aggregate({
            where: { year: 0 },
            sum: {
                steps: true,
            },
        });

        // Count all unique faculty
        const users = await prisma.entry.findMany({
            distinct: ['name'],
            where: { year: 0 },
        });

        return { steps: steps.sum.steps, users: users.length };
    });

    return {
        props,
        revalidate: 60,
    };
};

export default function Index({
    steps,
    users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <article>
                <a href="/">
                    <img
                        src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png"
                        alt="Fitness Challenge"
                    />
                </a>
            </article>
            <nav className="text">
                <h1>Total Faculty Steps</h1>
                <h1>Total Faculty Participating</h1>
            </nav>
            <nav className="totalSteps">
                <nav className="total">
                    <p>{steps}</p>
                </nav>
                <nav className="total">
                    <p>{users}</p>
                </nav>
            </nav>
            <Footer />
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

                article img {
                    /*Code for the step logo*/
                    width: 25%;
                    height: auto;
                    border: none;
                    margin-left: 39vw;
                    margin-top: 2vh;
                }

                h1 {
                    margin-left: 4vw;
                    margin-top: 20vh;
                }

                .totalSteps {
                    /*Design for the total steps box and position*/
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
                    /* this is also for the links and their boxes */
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
                    /*This is the filter to check if the screen is 600px or less*/
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
        </div>
    );
}
