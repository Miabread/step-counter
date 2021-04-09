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
                <a href="/shops">
                    <h2>View # of Steps by Shop</h2>
                </a>
                <div className="topimg">
                    <img
                        src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png"
                        alt="Fitness Challenge"
                        width="50%"
                        height="auto"
                    />
                </div>
                <a href="https://forms.gle/YWFLzeHt1Qne4HEV6">
                    <h2>Submit Form</h2>
                </a>
            </nav>

            <header className="header">
                <div className="total totalnumber">
                    <h1>School Total {steps}</h1>
                </div>
            </header>
            <section>
                <header>Links</header>
                <div>
                    <h2>Assabet Valley</h2>
                    <p>
                        Here is our school&apos;s website. You can see various
                        events here.
                    </p>

                    <img
                        src="https://i.ibb.co/6JgpjHw/assabetlogo.jpg"
                        width="45%"
                        height="auto"
                    />

                    <a href="http://assabet.org/">Visit</a>
                </div>
                <div>
                    <h2>Source Code</h2>
                    <p>You can view our Source Code here with Git Hub.</p>
                    <img
                        src="https://i.ibb.co/V9LYHXn/githublogo.png"
                        width="80%"
                        height="auto"
                    />
                    <a href="https://github.com/jamesBeeProg/step-counter">
                        View Source
                    </a>
                </div>
                <div>
                    <h2>Discord!</h2>
                    <p>
                        Join our discord to talk about the step challenge and
                        ask questions.
                    </p>

                    <img
                        src="https://i.ibb.co/Rysy2b2/discordlogo.jpg"
                        width="80%"
                        height="auto"
                    />
                    <a href="https://discord.gg/KnUP59Gg">Join</a>
                </div>
            </section>
            <section>
                <header>Creators</header>
                <div>
                    <h2>James Clark</h2>
                    <p>Programmer</p>
                </div>
                <div>
                    <h2>Wyatt Allaby</h2>
                    <p>Programmer</p>
                </div>
                <div>
                    <h2>Eric Edwards</h2>
                    <p>Data Analysis</p>
                </div>
                <div>
                    <h2>Mylena Bovo</h2>
                    <p>Logo Designer</p>
                </div>
            </section>
            <footer>
                <hr />
                Programmers: James Clark, Wyatt Allaby, Eric Edwards &#8226;
                Logo Designer: Mylena Bovo
            </footer>
            <style jsx>{`
                header {
                    text-align: center;
                }
                .top {
                    border: none;
                    background-color: #edbd3e;
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                    font-size: 20px;
                    height: 30vh;
                }

                .topimg {
                    margin-right: 8%;
                }

                .main {
                    background-color: #cfd6df;
                    margin: auto;
                    display: flex;
                    flex-flow: column;
                }

                section,
                main,
                nav,
                .header,
                h1 {
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                        0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }

                .total {
                    background-image: url('https://i.ibb.co/7VPXZtH/hikeimg.jpg');
                    background-position: center !important;
                    background-repeat: no-repeat !important;
                    background-size: cover !important;

                    height: 50vh;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                h1 {
                    padding: 0.5em;
                    background-color: white;
                    font-size: 40px;
                }

                section {
                    width: 100%;
                    min-height: 50vh;

                    background: #495e88;
                    color: black;

                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }

                section {
                    margin-top: 5vh;
                }

                section div,
                aside {
                    height: 60%;
                    width: 100%;
                    min-height: 50vh;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                aside {
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                /*section:nth-child(3) aside {
                    'https://i.ibb.co/Rysy2b2/discordlogo.jpg'
                    'https://i.ibb.co/V9LYHXn/githublogo.png'
                    'https://i.ibb.co/6JgpjHw/assabetlogo.jpg'
                }*/

                /* section:nth-child(4) aside {
                    background-image: url('');
                } */

                p {
                    width: 80%;
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
                    background-color: #495e88;
                    height: 0.2em;
                    width: 75vw;
                }

                a {
                    text-decoration: none;
                    padding: 1em;
                    margin: 1em;

                    transition: 0.5s;
                    color: black;

                    border: 2px solid #edbd3e;
                    border-radius: 33px;
                }

                a:hover {
                    background-color: #cfd6df;
                }
            `}</style>
        </div>
    );
}
