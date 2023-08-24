import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Strike({ children, styles, }: Props) {
  const style = {
    default: css([
      tw` line-through `,
      styles,
    ]),
  };

  return (
    <>
      <span css={style.default}>{children}</span>
    </>
  );
}
