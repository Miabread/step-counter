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
        {input.map((it, key) => (
            <div key={key}>
                <input
                    type="checkbox"
                    id={it}
                    name={it}
                    checked={checked[it]}
                    onChange={(event) => setChecked(it, event.target.checked)}
                />
                <label htmlFor={it}>{it}</label>
            </div>
        ))}
    </>
);
