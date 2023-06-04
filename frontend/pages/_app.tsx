import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { ApplicationProvider } from 'src/applicationProvider';
import Link from 'next/link';
import Head from 'next/head';

import type { AppProps } from 'next/app';

const Header = styled.header`
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid #0000002b;
  box-shadow: 0px 0px 9px #0000002b;
  padding: 0.5rem;
  display: flex;
  background-color: aliceblue;
  transition: top 0.2s ease-in-out;
  & a {
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
`;

const H1 = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  font-style: oblique;
`;

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <div id="root">
                <Head>
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                </Head>
                <Header>
                    <Link href="/">
                        <Image alt="pokeball" height={40} src="/pokeball.jpg" width={50} />
                        <H1>Pokedex</H1>
                    </Link>
                </Header>
                <ApplicationProvider>
                    <Component {...pageProps} />
                </ApplicationProvider>
            </div>
        </>
    );
}
