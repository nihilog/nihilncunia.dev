import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { Providers } from '@/src/layouts';
import '@/src/styles/tailwind.scss';
import 'react-toastify/dist/ReactToastify.css';
import '@/src/styles/code-block.scss';
import { ADS_TRACKINGCODE, GA_TRACKING_ID } from '../data/gtag';

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
    <Script
      strategy='afterInteractive'
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />

    <Script
      id='gtag-init'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
            gtag('config', '${ADS_TRACKINGCODE}');
          `,
      }}
    />
    <Component {...pageProps} />
  </Providers>
);

export default App;
