import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { prisma } from '../lib/prisma';
import { shops, years } from '../lib/shop';

export async function getStaticPaths() {
    return {
        paths: years.map(y => `/${y}`),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const year = parseInt(context.params?.year as string, 10);

    const queries = shops.map((_, shop) => prisma.entry.aggregate({
        where: { shop, year },
        sum: {
            steps: true,
        },
    }));

    const steps = await Promise.all(queries);

    return {
        props: {
            steps: steps.map(step => step.sum.steps),
        },
    };
};

export default function Index({ steps }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    const year = router.query.year === '0' ? 'Faculty' : router.query.year;

    return <>
        <Head>
            <title>Step Competition {year}</title>
        </Head>

        <header>
            <Link href="/">
                <h1>Step Competition {year}</h1>
            </Link>
            <hr />
            <nav>
                <Link href="2021">
                    2021
                </Link>
                <Link href="2022">
                    2022
                </Link>
                <Link href="2023">
                    2023
                </Link>
                <Link href="2024">
                    2024
                </Link>
                <Link href="0">
                    Faculty
                </Link>
            </nav>
            <hr />
        </header>

        <main>
            <dl>
                {shops.map((shop, i) => (<>
                    <dt>{shop}</dt>
                    <dd>{steps[i]} Steps</dd>
                </>))}
            </dl>
        </main>
    </>;
}
