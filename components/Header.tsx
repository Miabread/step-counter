import Head from "next/head";
import Link from "next/link";
import React from "react";
import { years, yearToString } from "../lib/shop";

export function Header({ year = '' }) {
    return (
        <header>
            <Head>
                <title>Step Competition {yearToString(year)}</title>
            </Head>
            <h1>Step Competition {yearToString(year)}</h1>
            <hr />
            <nav>
                <Link href="/">
                    Everyone
                </Link>
                {years.map(year => (
                    <Link href={`/${year}`} key={year}>
                        {yearToString(year)}
                    </Link>
                ))}
            </nav>
            <hr />
            <style jsx>{`
                h1 {
                    text-align: center;
                }

                nav {
                    padding: 1em;
                    display: flex;
                    justify-content: space-around;
                }
            `}</style>
        </header>
    );
}
