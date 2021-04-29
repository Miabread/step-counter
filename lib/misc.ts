import { GetStaticPaths } from 'next';
import { times } from './data';

export const createStyle = (styles: Record<string, string>) => (
    ...names: string[]
) => names.map((it) => styles[it]).join(' ');

export const getStaticPathsForView = (
    view: string,
): GetStaticPaths => async () => {
    return {
        paths: Object.keys(times).map((it) => `/${it}/${view}`),
        fallback: false,
    };
};
