import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Providers } from '@/src/layouts';
import '@/src/styles/tailwind.scss';
import 'react-toastify/dist/ReactToastify.css';
import '@/src/styles/code-block.scss';

const App = ({ Component, pageProps, }: AppProps) => (
  <Providers>
    <Head>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      />
    </Head>
    <Component {...pageProps} />
  </Providers>
);

export default App;
