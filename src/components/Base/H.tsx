import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  level?: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');
  type?: ('post' | 'normal' | 'postlist');
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function H({
  level: Heading = 'h2', type = 'normal', children, styles,
}: Props) {
  const size = {
    h1: tw` text-h1 `,
    h2: tw` text-h2 `,
    h3: tw` text-h3 `,
    h4: tw` text-h4 `,
    h5: tw` text-h5 `,
    h6: tw` text-h6 `,
  };

  const style = {
    default: css([
      tw` leading-[1] text-black-base `,
      type === 'post' && tw` font-black p-2 px-3 border-l-[12px] border-blue-600 `,
      type === 'normal' && tw` font-black `,
      type === 'postlist' && tw` text-justify break-all mt-[-10px] `,
      size[Heading],
      styles,
    ]),
  };

  return (
    <>
      <Heading css={style.default}>{children}</Heading>
    </>
  );
}
