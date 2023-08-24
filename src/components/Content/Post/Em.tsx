import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Em({ children, styles, }: Props) {
  const style = {
    default: css([
      tw` text-inherit mr-1 `,
      styles,
    ]),
  };

  return (
    <>
      <em css={style.default}>{children}</em>
    </>
  );
}
