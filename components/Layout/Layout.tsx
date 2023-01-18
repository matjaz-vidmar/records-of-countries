import { css } from '@emotion/react';
import Head from 'next/head';
import Header from './Header';

const contentWrap = css`
  display: flex;
  flex-direction: column;
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
  }
`;
type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main css={contentWrap}>{children}</main>
    </>
  );
}

export default Layout;
