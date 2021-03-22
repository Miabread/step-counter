import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { years } from '../lib/data';

interface Props {
    page: string;
}

export function ShopHeader({ page }: Props) {
    const activeIfPage = (match: string) => (match === page ? 'active' : '');

    return (
        <header>
            <Head>
                <title>Fitness Challenge {page}</title>
            </Head>

            <a href="/">
                <img
                    src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png"
                    alt="Fitness Challenge"
                />
            </a>

            <hr />
            <nav className="tab">
                <Link href="/shops/">
                    <a className={activeIfPage('')}>All Students</a>
                </Link>

                {years.map((year) => (
                    <Link href={`/shops/${year}`} key={year}>
                        <a className={activeIfPage(year)}>{year}</a>
                    </Link>
                ))}

                <Link href="/shops/users">
                    <a className={activeIfPage('users')}>Participants</a>
                </Link>
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
                    width: 9%;
                    height: auto;
                    border: none;
                    margin: 1% 0% 0% 45%;
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
        </header>
    );
}
