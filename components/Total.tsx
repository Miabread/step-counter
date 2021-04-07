import React from 'react';
import { createStyle } from '../lib/css';
import css from '../pages/[time]/index.module.css';

const style = createStyle(css);

interface Props {
    input: readonly number[];
}

export const Total = ({ input }: Props) => {
    const total = input.reduce((acc, it) => acc + it, 0);

    return (
        <>
            <div className={style('index')}>+</div>
            <div>Total</div>
            <div className={style('content')}>{total}</div>
        </>
    );
};
