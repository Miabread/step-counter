import { shopEntries } from '../lib/data';
import React from 'react';

interface Props {
    data: number[];
    label: string;
}

export function ShopEntries({ data, label }: Props) {
    return (
        <main>
            {shopEntries.map(([shop, i]) => (
                <section key={i}>
                    <h3>{shop}</h3>
                    <p>
                        {data[i]} {label}
                    </p>
                </section>
            ))}
            <style jsx>{`
                main {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }

                section {
                    min-width: 15em;
                    padding: 1em;
                    margin: 1em;
                    border-radius: 1em;

                    text-align: center;
                    background-color: gold;
                }
            `}</style>
        </main>
    );
}
