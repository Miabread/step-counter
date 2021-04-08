import { AppProps } from 'next/app';
import React from 'react';
import { useCheckbox, yearFilterContext } from '../components/YearFilter';
import { stringYears } from '../lib/data';
import './_app.css';

export default function App({ Component, pageProps }: AppProps) {
    const yearFilter = useCheckbox(stringYears);

    return (
        <yearFilterContext.Provider value={yearFilter}>
            <Component {...pageProps} />
        </yearFilterContext.Provider>
    );
}
