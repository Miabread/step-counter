import React from 'react';
import { createStyle } from '../lib/misc';
import css from '../pages/[time]/index.module.scss';

const style = createStyle(css);

interface Props {
    input: readonly number[] | number;
    label?: string;
}

export const Total = ({ input, label = 'Total' }: Props) => {
    const total =
        typeof input === 'number'
            ? input
            : input.reduce((acc, it) => acc + it, 0);

    return (
        <>
            <div className={style('index')}>+</div>
            <div>{label}</div>
            <div className={style('content')}>{total}</div>
        </>
    );
};
