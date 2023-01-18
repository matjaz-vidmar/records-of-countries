import { headerStyle } from '@/styles/headerStyle';
import { css } from '@emotion/react';

export default function Header() {
  return (
    <header css={headerStyle.headerWidth}>
      <div css={headerStyle.headerSpan}>
        <h1 css={headerStyle.appName}>Records of Countries</h1>
      </div>
    </header>
  );
}
