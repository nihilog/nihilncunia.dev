import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Content({ children, styles, }: Props) {
  const style = {
    default: css([
      tw` flex flex-col gap-5 flex-1 shrink-0 `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        {children}
      </div>
    </>
  );
}
