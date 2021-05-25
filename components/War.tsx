import Link from 'next/link';
import React from 'react';
import { createStyle } from '../lib/misc';
import css from '../pages/[time]/index.module.scss';

const style = createStyle(css);

export const War = () => {
    return (
        <>
            <div className={style('index')}>+</div>
            <div>
                <Link href="/war">
                    <a>
                        <h1>War</h1>
                    </a>
                </Link>
            </div>
            <div>
                <Link href="/war">
                    <a>
                        <h1>War</h1>
                    </a>
                </Link>
            </div>
        </>
    );
};
