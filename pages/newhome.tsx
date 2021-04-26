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
                <a href="/all/shops">
                    <h2>View # of Steps by Shop</h2>
                </a>
                <div className="topimg">
                    <img
                        src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png"
                        alt="Logo"
                        width="50%"
                        height="auto"
                    />
                </div>
                <a href="https://forms.gle/YWFLzeHt1Qne4HEV6">
                    <h2>Submit Form</h2>
                </a>
            </nav>
            <header className="header">
                <div className="total">
                    <div className="padding"></div>
                    <div className="text">
                        <h1>School Total {steps}</h1>
                    </div>
                </div>
            </header>
            <section>
                <header className="links">Links</header>
                <div className="linksdiv">
                    <div className="sectiondiv">
                        <h2>Assabet Valley</h2>
                        <p>
                            Here is our school&apos;s website. You can see
                            various events here.
                        </p>

                        <img
                            src="https://i.ibb.co/6JgpjHw/assabetlogo.jpg"
                            width="45%"
                            height="auto"
                        />

                        <a href="http://assabet.org/">Visit</a>
                    </div>
                    <div className="sectiondiv">
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
                    <div className="sectiondiv">
                        <h2>Discord!</h2>
                        <p>
                            Join our discord to talk about the step challenge
                            and ask questions.
                        </p>

                        <img
                            src="https://i.ibb.co/Rysy2b2/discordlogo.jpg"
                            width="80%"
                            height="auto"
                        />
                        <a href="https://discord.gg/KnUP59Gg">Join</a>
                    </div>
                </div>
            </section>
            <section>
                <header className="creators">Creators</header>
                <div className="creatorsdiv">
                    <div className="sectiondiv">
                        <h2>James Clark</h2>
                        <p>Programmer</p>
                    </div>
                    <div className="sectiondiv">
                        <h2>Wyatt Allaby</h2>
                        <p>Programmer</p>
                    </div>
                    <div className="sectiondiv">
                        <h2>Eric Edwards</h2>
                        <p>Data Analysis</p>
                    </div>
                    <div className="sectiondiv">
                        <h2>Mylena Bovo</h2>
                        <p>Logo Designer</p>
                    </div>
                </div>
            </section>
            <footer></footer>
            <style jsx>{`
                .padding {
                    position: absolute;
                    display: center;
                    padding: 3em;
                    background-color: white;
                    opacity: 0.5;
                    width: 17%;
                }

                .text {
                    position: relative;
                }

                .total {
                    position: relative;
                }

                @media only screen and (max-width: 1024px) {
                    .padding {
                        width: 72%;
                    }
                }

                .links {
                    font-size: 40px;
                    text-align: center;
                }

                .linksdiv {
                    /* first section layout with links */
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }

                .creators {
                    font-size: 40px;
                    text-align: center;
                }

                .creatorsdiv {
                    /* second section layout with names */
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }

                .top {
                    /* creates the header at top of page */
                    border: none;
                    background-color: #edbd3e;
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                    font-size: 20px;
                    height: 30vh;
                }
                /* Here is where the different sizes for phones starts */
                @media only screen and (max-width: 600px) {
                    .top {
                        /* All of the positioning for the top of the page */
                        text-align: center;
                        display: flex;
                        justify-content: space-around;
                        flex-direction: column;
                        font-size: 10px;
                        height: 30vh;
                    }
                    .topimg {
                        order: -1; /* This moves the Logo to the top of the page on phones */
                        width: 45%;
                        height: auto;
                    }
                }
                @media only screen and (width: 280px) {
                    .top {
                        height: 38vh; /* Galaxy Fold */
                    }
                }
                @media only screen and (width: 320px) {
                    .top {
                        height: 40vh; /* iPhone 5/SE */
                    }
                }
                @media only screen and (width: 360px) {
                    .top {
                        height: 37vh; /* Galaxy S5 and Moto G4 */
                    }
                }
                @media only screen and (width: 375px) {
                    .top {
                        height: 35vh; /* iPhone X and iPhone 6/7/8 */
                    }
                }
                @media only screen and (width: 411px) {
                    .top {
                        height: 35vh; /* Pixel 2 and Pixel 2 XL*/
                    }
                }
                @media only screen and (width: 414px) {
                    .top {
                        height: 35vh; /* iPhone 6/7/8 Plus*/
                    }
                }
                @media only screen and (width: 450px) {
                    .top {
                        height: 40vh; /* Surface Duo */
                    }
                }
                @media only screen and (width: 1024px) {
                    .top {
                        height: 15vh; /* iPad Pro */
                    }
                }

                .topimg {
                    margin-right: 8%; /* Keeps the image centered for computer */
                }

                @media only screen and (max-width: 600px) {
                    /* Keeps the logo centered for phones */
                    .topimg {
                        margin: auto;
                        margin-top: 5%;
                    }
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
                .total,
                .header {
                    /* Gives each box its own shade */
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                        0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }

                .total {
                    /* this is the total image that floats in the back */
                    background-image: url('https://i.ibb.co/7VPXZtH/hikeimg.jpg');
                    background-position: center !important;
                    background-repeat: no-repeat !important;
                    background-size: cover !important;

                    height: 50vh;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                @media only screen and (max-width: 600px) {
                    .total {
                        height: 30vh;
                    }
                }

                @media only screen and (max-width: 600px) {
                    h1 {
                        text-align: center; /* keeps in place for the phone */
                    }
                }

                /* all section/aside css is adressing the different boxing */
                section {
                    width: 100%;
                    min-height: 50vh;

                    padding-top: 2em;
                    background: #495e88;
                    color: black;
                }

                section:nth-child(4) {
                    margin-top: 5vh; /* splits up the two sections */
                }

                .sectiondiv,
                aside {
                    /* some layout for the sizing of section */
                    height: 60%;
                    width: 100%;
                    min-height: 50vh;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                @media only screen and (max-width: 600px) {
                    section div,
                    aside {
                        height: 60%;
                        width: 100%;
                        min-height: 50vh;

                        display: flex;
                        flex-direction: column; /* keeps sections vertical */
                        justify-content: center;
                        align-items: center;
                    }
                }

                aside {
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                p {
                    width: 80%;
                }

                footer {
                    text-align: center;
                    padding-top: 1em;
                    padding-bottom: 1em;
                    font-style: italic;
                }

                a {
                    /* design for the links */
                    text-decoration: underline;
                    padding: 1em;
                    margin: 1em;

                    transition: 0.5s;
                    color: darkblue;

                    border: 2px solid #edbd3e;
                    border-radius: 33px;
                }

                a:hover {
                    background-color: #cfd6df; /* changes background color when hovering links */
                }
            `}</style>
        </div>
    );
}
