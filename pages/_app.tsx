import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return <>
        <Component {...pageProps} />
        <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

            html, body {
                margin: 0;
                padding: 0;
            }

            body {
                font-family: 'Open Sans', sans-serif;
            }
        `}</style>
    </>
}
