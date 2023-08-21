import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Code({ children, styles, }: Props) {
  const style = {
    default: css([
      tw` px-1 break-all bg-blue-100 rounded-1 text-blue-700 `,
      styles,
    ]),
  };

  return (
    <>
      <code css={style.default}>{children}</code>
    </>
  );
}
