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
            <div key={key}>
                <input
                    type="radio"
                    id={label}
                    name={label}
                    defaultChecked={selected === label}
                />
                <label htmlFor={label}>
                    <Link href={link}>{label}</Link>
                </label>
            </div>
        ))}
    </>
);
