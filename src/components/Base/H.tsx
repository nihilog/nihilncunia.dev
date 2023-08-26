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
    h6: tw` text-h6 font-700 `,
  };

  const style = {
    default: css([
      tw` leading-[1.2] text-black-base dark:text-white [span]:( flex items-center gap-2 text-[70%] mf-sm:text-[80%] mf-md:text-[90%] mf-lg:text-[100%] font-black ) `,
      type === 'post' && tw` font-black p-2 px-3 border-l-[12px] border-blue-600 dark:border-yellow-300 `,
      type === 'normal' && tw` font-black `,
      type === 'postlist' && [
        tw` [a]:( text-justify break-all p-2 border border-transparent bg-blue-100 flex items-center justify-start text-[60%] mf-sm:text-[70%] text-blue-600 transition-all duration-200 flex-1 shrink-0 ) `,
        tw` [a:hover]:( bg-blue-500 text-white ) `,
        tw` dark:( [a]:( border-yellow-300/30 text-yellow-300 bg-black-600 hover:( bg-yellow-300 text-black-base ) ) ) `,
      ],
      size[Heading],
      styles,
    ]),
  };

  return (
    <>
      <Heading css={style.default}>
        <span>{children}</span>
      </Heading>
    </>
  );
}
