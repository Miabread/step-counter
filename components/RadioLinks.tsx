import Link from 'next/link';
import React from 'react';

interface Options {
    label: string;
    link: string;
}

interface Props {
    options: readonly Options[];
    selected: string;
}

export const RadioLinks = ({ options: input, selected }: Props) => (
    <>
        {input.map(({ label, link }, key) => (
            <Link href={link} key={key}>
                <div>
                    <input
                        type="radio"
                        id={label}
                        name={label}
                        checked={selected === label}
                        readOnly
                    />
                    <label htmlFor={label}>{label}</label>
                </div>
            </Link>
        ))}
    </>
);
