import React, { createContext, useContext, useState } from 'react';
import { stringYears } from '../lib/data';

export const yearFilterContext = createContext(
    (null as unknown) as UseCheckbox,
);

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

export type UseCheckbox = ReturnType<typeof useCheckbox>;

export const YearFilter = () => {
    const [yearFilter, setYearFilter] = useContext(yearFilterContext);

    return (
        <>
            {stringYears.map((year, key) => (
                <div key={key}>
                    <input
                        type="checkbox"
                        id={year}
                        name={year}
                        checked={yearFilter[year]}
                        onChange={(event) =>
                            setYearFilter(year, event.target.checked)
                        }
                    />
                    <label htmlFor={year}>{year}</label>
                </div>
            ))}
        </>
    );
};
