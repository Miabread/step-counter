import Link from 'next/link';
import React from 'react';
import { createStyle } from '../lib/misc';
import css from '../pages/[time]/index.module.scss';

const style = createStyle(css);

export const DataHeader = () => {
    return (
        <div className={style('top')}>
            <Link href="/">
                <a>
                    <img
                        src="https://i.ibb.co/g6WmH7B/Stepintoaction-3clr-1.png"
                        alt="Not Header"
                        title="Not Header"
                    />
                </a>
            </Link>
        </div>
    );
};
