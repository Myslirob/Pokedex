import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="/favicon.png" rel="icon" />
                <link href="/manifest.json" rel="manifest" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>
            <body style={{ margin: 0, overflowY: 'scroll' }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
