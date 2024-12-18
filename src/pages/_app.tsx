import React from 'react';
import { ConfigProvider } from 'antd';
import Head from 'next/head';
import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { AppProps } from 'next/app';
import "@/styles/globals.css";

import theme from '@/theme/themeConfig';

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <ConfigProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Job Career</title>
      </Head>
      <Component {...pageProps} />
    </ConfigProvider>
  </UserProvider>
);

export default App;