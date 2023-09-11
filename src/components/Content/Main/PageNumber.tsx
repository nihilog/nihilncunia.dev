import React, { useMemo } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  number: number;
  currentPage: number;
  styles?: TwStyle | SerializedStyles;
}

export function PageNumber({ number, currentPage, styles, }: Props) {
  const router = useRouter();

  const path = useMemo(() => {
    if (router.asPath.includes('posts')) {
      return `/posts?pageNumber=${number}`;
    } else if (router.asPath.includes('categories')) {
      return `/categories/${router.query.category}?pageNumber=${number}`;
    } else if (router.asPath.includes('tags')) {
      return `/tags/${router.query.tag}?pageNumber=${number}`;
    } else {
      return `/search?pageNumber=${number}`;
    }
  }, [ router.asPath, router.query, ]);

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
        href={path}
        css={style.default}
      >
        {number}
      </Link>
    </>
  );
}
