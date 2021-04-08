import { AppProps } from 'next/app';
import React, { createContext } from 'react';
import { UseCheckbox, useCheckbox } from '../components/Checkboxes';
import { stringYears } from '../lib/data';
import './_app.css';

export const yearFilterContext = createContext(
    (null as unknown) as UseCheckbox,
);

export default function App({ Component, pageProps }: AppProps) {
    const yearFilter = useCheckbox(stringYears);

    return (
        <yearFilterContext.Provider value={yearFilter}>
            <Component {...pageProps} />
        </yearFilterContext.Provider>
    );
}
