import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { prisma } from '../lib/prisma';
import { shops, years } from '../lib/shop';

export const getStaticProps: GetStaticProps = async (context) => {
    const queries = shops.map((_, shop) => prisma.entry.aggregate({
        where: { shop },
        sum: {
            steps: true,
        },
    }));

    const steps = await Promise.all(queries);

    return {
        props: {
            steps: steps.map(step => step.sum.steps),
        },
        revalidate: 60 * 5,
    };
};

export default function Index({ steps }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <>
        <Head>
            <title>Step Competition</title>
        </Head>

        <header>
            <Link href="/">
                <h1>Step Competition</h1>
            </Link>
            <hr />
            <nav>
                {years.map(year => (
                    <Link href={year} key={year}>
                        {year === '0' ? 'Faculty' : year}
                    </Link>
                ))}
            </nav>
            <hr />
        </header>

        <main>
            <dl>
                {shops.map((shop, i) => (<>
                    <dt key={i}>{shop}</dt>
                    <dd key={i}>{steps[i]} Steps</dd>
                </>))}
            </dl>
        </main>
    </>;
}
