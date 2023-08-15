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
      tw` p-1 px-3 bg-white rounded-1 border border-black-200 hover:( bg-blue-200 no-underline border-blue-200 ) shadow-md `,
      currentPage === number && tw` text-white bg-blue-500 border-blue-500 cursor-default hover:( bg-blue-500 no-underline text-white border-blue-500 ) `,
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
