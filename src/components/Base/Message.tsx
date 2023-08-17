import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  color: ('r' | 'b' | 'g' | 'y');
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Message({ color, children, styles, }: Props) {
  const style = {
    default: css([
      tw` p-3 border `,
      tw` [p]:( text-justify break-all ) `,
      color === 'r' && tw`  `,
      color === 'g' && tw`  `,
      color === 'b' && tw` border-blue-400 bg-blue-100 text-blue-500 `,
      color === 'y' && tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>{children}</div>
    </>
  );
}
