import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Strong({ children, styles, }: Props) {
  const style = {
    default: css([
      tw` text-inherit font-black `,
      styles,
    ]),
  };

  return (
    <>
      <strong css={style.default}>{children}</strong>
    </>
  );
}
