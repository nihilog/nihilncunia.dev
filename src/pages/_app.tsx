import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { Providers } from '@/src/layouts';
import '@/src/styles/tailwind.scss';
import 'react-toastify/dist/ReactToastify.css';
import '@/src/styles/code-block.scss';
import { GA_TRACKING_ID } from '../data/gtag';

const App = ({ Component, pageProps, }: AppProps) => (
  <Providers>
    <Head>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      />
      <meta
        name='naver-site-verification'
        content='adb852945c57740b1e19ceafc8bdfa930e672f54'
      />
    </Head>
    <Script
      strategy='afterInteractive'
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />

    <Script
      async
      strategy='afterInteractive'
      src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9256396675875954'
      crossOrigin='anonymous'
    />

    <Script
      id='gtag-init'
      strategy='afterInteractive'
    >
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YBWM79C66F', {
          page_path: window.location.pathname,
        });
      `}
    </Script>
    <Component {...pageProps} />
  </Providers>
);

export default App;
