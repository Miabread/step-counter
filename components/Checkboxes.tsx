import React, { useState } from 'react';

export const useCheckbox = (array: readonly string[]) => {
    const [checked, setCheckboxes] = useState(
        Object.fromEntries(array.map((it) => [it, true])),
    );

    const setChecked = (key: string, value: boolean) =>
        setCheckboxes({
            ...checked,
            [key]: value,
        });

    return [checked, setChecked] as const;
};

type UseCheckbox = ReturnType<typeof useCheckbox>;

export interface Props {
    input: readonly string[];
    checked: UseCheckbox[0];
    setChecked: UseCheckbox[1];
}

export const Checkboxes = ({ input, checked, setChecked }: Props) => (
    <>
        {input.map((year, key) => (
            <div key={key}>
                <input
                    type="checkbox"
                    id={String(year)}
                    name={String(year)}
                    checked={checked[year]}
                    onChange={(event) => setChecked(year, event.target.checked)}
                />
                <label htmlFor={String(year)}>{year}</label>
            </div>
        ))}
    </>
);
