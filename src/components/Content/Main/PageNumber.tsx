import React, { useEffect, useMemo, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { A } from '@/src/components/Base';

interface Props {
  number: number;
  currentPage: number;
  styles?: TwStyle | SerializedStyles;
}

export function PageNumber({ number, currentPage, styles, }: Props) {
  // const [ path, setPath, ] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //   const postsCond = /^(\/posts)/g;
  //   const categoriesCond = /^\/categories/g;
  //   const tagsCond = /^\/tags/g;

  //   console.log(router.pathname.match(postsCond));

  //   // if (router.pathname.match(postsCond)) {

  //   // }
  // }, []);

  const path = useMemo(() => {
    const postsCond = /^(\/posts)/g;
    const categoriesCond = /^\/categories/g;
    const tagsCond = /^\/tags/g;

    // if () {

    // }
  }, []);

  const style = {
    default: css([
      tw` px-3 flex items-center justify-center border border-black-200 bg-white text-blue-500 dark:( bg-black-500 border-black-400 text-yellow-300 ) shadow-md hover:( text-blue-600 border-blue-500 bg-blue-100 no-underline dark:( border-yellow-300 text-yellow-300 bg-black-600 ) ) transition-all duration-200 `,
      currentPage === number && tw` bg-blue-500 border-blue-500 text-white dark:( border-yellow-300 text-black-600 bg-yellow-300 ) hover:( bg-blue-500 border-blue-500 no-underline text-white dark:( border-yellow-300 text-black-600 bg-yellow-300 ) ) `,
      styles,
    ]),
  };

  return (
    <>
      <Link
        href={`${router.pathname}?pageNumber=${number}`}
        css={style.default}
      >
        {number}
      </Link>
    </>
  );
}
