import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Index() {
    const router = useRouter();
    const year = router.query.year as string | undefined;

    return <>
        <Head>

        </Head>
        <header>
            <Link href="/">
                <h1>Step Competition</h1>
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
    </>;
}
