import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="/icon-48x48.png" rel="shortcut icon" />
                <link href="/manifest.json" rel="manifest" />
            </Head>
            <body style={{ margin: 0, overflowY: 'scroll' }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
