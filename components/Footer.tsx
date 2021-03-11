import React from 'react';

export function Footer() {
    return (
        <footer>
            <hr />
            Logo Designer: Mylena Bovo &#8226; Programmers: James Clark, Wyatt
            Allaby &#8226;{' '}
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
                    background-color: navy;
                    height: 0.2em;
                    width: 75vw;
                }
            `}</style>
        </footer>
    );
}
