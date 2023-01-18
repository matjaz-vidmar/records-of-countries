import { css } from '@emotion/react';

export const headerStyle = {
  headerWidth: css`
    width: 100%;
  `,

  headerSpan: css`
    display: flex;
    justify-content: center;
    padding: 15px;
    background: #eaafc8;
    background: -webkit-linear-gradient(to right, #eaafc8, #654ea3);
    background: linear-gradient(to right, #eaafc8, #654ea3);
    box-shadow: 20px 18px 24px -10px rgba(0, 0, 0, 0.33);
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
  `,
  appName: css`
    display: flex;
    font-weight: bold;
    font-stretch: wider;
    font-size: 50px;

    color: black;
  `,
};
