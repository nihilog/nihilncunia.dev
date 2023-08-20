import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function P({ children, styles, }: Props) {
  const style = {
    default: css([
      tw` text-black-base text-justify break-all font-500 `,
      tw` [strong]:( font-900 ) `,
      tw` [em]:( mr-1 ) `,
      styles,
    ]),
  };

  return (
    <>
      <p css={style.default}>{children}</p>
    </>
  );
}
