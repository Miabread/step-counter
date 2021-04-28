import React from 'react';

export function Footer() {
    return (
        <footer>
            <hr />
            Programmers: Wyatt Allaby, James Clark, Eric Edwards &#8226; Logo
            Designer: Mylena Bovo &#8226;{' '}
            <a href="https://discord.gg/5pJJY2bTZ8">Discord</a> &#8226;{' '}
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
