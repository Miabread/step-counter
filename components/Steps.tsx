import React, { Fragment } from 'react';
import { createStyle } from '../lib/misc';
import css from '../pages/[time]/index.module.scss';

const style = createStyle(css);

interface Props {
    input: (readonly [string, number])[];
}

export const Steps = ({ input }: Props) => {
    return (
        <>
            {input.map(([label, steps], key) => (
                <Fragment key={key}>
                    <div className={style('index')}>{key + 1}</div>
                    <div>{label}</div>
                    <div className={style('content')}>{steps}</div>
                </Fragment>
            ))}
        </>
    );
};
