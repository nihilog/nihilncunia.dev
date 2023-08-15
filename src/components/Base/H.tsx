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
      tw` leading-[1] `,
      type === 'post' && tw`  `,
      type === 'normal' && tw` text-black-base font-black `,
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
