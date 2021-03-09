import Head from "next/head";
import Link from "next/link";
import React from "react";
import { years, yearToString } from "../lib/shop";

export function Header({ year = '' }) {
    return (
        <header>
            <body>
                <Head>
                    <title>Step Competition {yearToString(year)}</title>
                </Head>

                <a href="/"><img src="https://i.ibb.co/fCpvm1V/Stepactionclr.png" alt="Stepactionclr" /></a>

                <hr />
                <nav className="tab">
                    <Link href="/">
                        <a>Everyone</a>
                    </Link>
                    {years.map(y => (
                        <Link href={`/${y}`} key={y}>
                            <a className={y === year ? 'active' : ''}>{yearToString(y)}</a>
                        </Link>
                    ))}
                </nav>
                <hr />
                <style jsx>{`

                @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

                h1 {
                    text-align: center;
                }

                hr {
                    display: block;
                    text-align: center;
                    background-color: navy;
                    height: 0.2em;
                }

                img {
                    width: 10vw;
                    height: 15vh;
                    border: none;
                    margin: 0% 0% 0% 45%;
                }

                nav {
                    font-family: 'Anton', sans-serif;
                    display: flex;
                    justify-content: space-around;
                    background-color: inherit;
                    color: navy;
                    border: 0.3em;
                    outline: none;
                    padding: 1em;
                    cursor: pointer;
                    transition: 0.3s;
                    font-size: 17px;
                }

                .tab {
                    overflow: hidden;
                    border: 1px solid white;
                    background-color: white;
                }

                /* Change background color of buttons on hover */
                nav a:hover {
                    background-color: gold;
                }

                /* Create an active/current tablink class */
                nav a.active {
                    background-color: gold;
                }
            `}</style>
            </body>
        </header>
    );
}
