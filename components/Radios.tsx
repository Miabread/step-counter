import React from 'react';

interface Props {
    options: readonly string[];
    selected: string;
    setSelected: (selected: string) => void;
}

export const Radios = ({ options: input, selected, setSelected }: Props) => (
    <>
        {input.map((it, key) => (
            <div key={key}>
                <input
                    type="radio"
                    id={it}
                    name={it}
                    checked={selected === it}
                    onChange={() => setSelected(it)}
                />
                <label htmlFor={it}>{it}</label>
            </div>
        ))}
    </>
);
