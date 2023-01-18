import { css } from '@emotion/react';

export const indexStyle = {
  main: css`
    display: grid;
  `,
  entryNav: css`
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 10px;
    padding-top: 20px;
  `,
  entryNavTable: css`
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  `,

  entryBoxStyle: css`
    text-align: center;
    font-size: 20px;
    width: 240px;
    height: 40px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 20px 18px 24px -10px rgba(0, 0, 0, 0.33) inset;
    -webkit-box-shadow: 20px 18px 24px -10px rgba(0, 0, 0, 0.33) inset;
    -moz-box-shadow: 20px 18px 24px -10px rgba(0, 0, 0, 0.33) inset;
  `,

  labelStyle: css`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  `,
  smallButtonStyle: css`
    border-radius: 5px;
    width: 100px;
    height: 20px;
    font-size: 15px;
    margin: 5px;
    background-color: white;
    color: black;
    :hover {
      background: #eaafc8;
      background: -webkit-linear-gradient(to right, #eaafc8, #654ea3);
      background: linear-gradient(to right, #eaafc8, #654ea3);
      color: black;
      transition: 0.5s;
    }
  `,
  buttonStyle: css`
    border-radius: 5px;
    width: 250px;
    height: 50px;
    margin-top: 20px;
    font-size: 25px;
    background-color: white;
    color: black;
    :hover {
      background: #eaafc8;
      background: -webkit-linear-gradient(to right, #eaafc8, #654ea3);
      background: linear-gradient(to right, #eaafc8, #654ea3);
      color: black;
      transition: 0.5s;
    }
  `,
};
