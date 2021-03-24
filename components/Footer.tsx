import React from 'react';

export function Footer() {
    return (
        <footer>
            <hr />
            Programmers: James Clark, Wyatt Allaby, Tye Oulette &#8226; Logo
            Designer: Mylena Bovo{' '}
            <a href="https://github.com/jamesBeeProg/step-counter">Source</a>
            <style jsx>{`
                footer {
                    text-align: center;
                    padding-top: 1em;
                    padding-bottom: 1em;
                    font-style: italic;
                }
                footer hr {
                    display: block;
                    text-align: center;
                    background-color: #185fac;
                    height: 0.2em;
                    width: 75vw;
                }
            `}</style>
        </footer>
    );
}
