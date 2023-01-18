import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          box-sizing: border-box;
          border: solid #324194 10px;
          padding: 5px;

          body {
            font-family: Georgia, 'Times New Roman', Times, serif;
            flex-direction: column;
            font-size: medium;
            display: flex;
          }
        `}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
