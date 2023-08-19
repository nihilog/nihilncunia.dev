import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { A } from '@/components/Base';

interface Props {
  number: number;
  currentPage: number;
  styles?: TwStyle | SerializedStyles;
}

export function PageNumber({ number, currentPage, styles, }: Props) {
  const style = {
    default: css([
      tw` px-3 flex items-center justify-center border border-black-200 bg-white shadow-md hover:( bg-blue-400 border-blue-400 text-white no-underline ) transition-all duration-200 `,
      currentPage === number && tw` bg-blue-500 border-blue-500 text-white hover:( bg-blue-500 border-blue-500 no-underline text-white ) `,
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
