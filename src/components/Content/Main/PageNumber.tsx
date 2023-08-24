import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { A } from '@/src/src/components/Base';

interface Props {
  number: number;
  currentPage: number;
  styles?: TwStyle | SerializedStyles;
}

export function PageNumber({ number, currentPage, styles, }: Props) {
  const style = {
    default: css([
      tw` px-3 flex items-center justify-center border border-black-200 bg-white dark:( bg-black-500 border-black-400 ) shadow-md hover:( text-blue-600 border-blue-500 bg-blue-100 no-underline dark:( border-yellow-300 text-yellow-300 bg-black-600 ) ) transition-all duration-200 `,
      currentPage === number && tw` bg-blue-500 border-blue-500 text-white dark:( border-yellow-300 text-black-600 bg-yellow-300 ) hover:( bg-blue-500 border-blue-500 no-underline text-white dark:( border-yellow-300 text-black-600 bg-yellow-300 ) ) `,
      styles,
    ]),
  };

  return (
    <>
      <A
        href={`?pageNumber=${number}`}
        label='pageLink'
        styles={style.default}
      >
        {number}
      </A>
    </>
  );
}
