import React, { useState } from 'react';
import { years } from '../lib/data';
import { usePrisma } from '../lib/prisma';

// export const getStaticProps = async () => {
//     const query = await usePrisma(async (prisma) => {});

//     prisma.entry.aggregate({
//         where: {
//             year,
//             verified: true,
//         },
//         sum: {
//             steps: true,
//         },
//     });

//     return {
//         props: { steps: query.sum.steps },
//         revalidate: 60,
//     };
// };

export default function New() {
    const [selection, setSelection] = useState<Record<string, boolean>>({});

    return (
        <div>
            {years.map((year, i) => (
                <React.Fragment key={i}>
                    <input
                        type="checkbox"
                        id={String(year)}
                        name={String(year)}
                        checked={selection[year]}
                        onChange={(event) =>
                            setSelection({
                                ...selection,
                                [year]: event.target.checked,
                            })
                        }
                    />
                    <label htmlFor={String(year)}>{year}</label>
                </React.Fragment>
            ))}
            {JSON.stringify(
                Object.entries(selection)
                    .filter(([_, it]) => it)
                    .map(([it]) => +it),
                null,
                2,
            )}
            <style jsx>{`
                div {
                    width: 50vw;
                    margin: auto;
                    display: flex;
                    flex-flow: column;
                }
            `}</style>
        </div>
    );
}
