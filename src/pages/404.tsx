import React, { useLayoutEffect } from 'react';
import tw, { css } from 'twin.macro';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Meta } from '../components/Layout';
import { useAppSelector } from '../hooks/rtk';

const NotPound404 = () => {
  const isDark = useAppSelector((state) => state.dark.isDark);
  const router = useRouter();

  useLayoutEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [ isDark, ]);

  const style = {
    default: css([
      tw` w-screen h-screen mt-[-8px] mx-[-8px] flex items-center justify-center [p]:( text-big mb-2 text-black-base ) dark:( [p]:( text-white ) ) `,
    ]),
    heading: tw` text-black-base text-h1 font-black text-center mb-2 flex items-center justify-center leading-[1] dark:text-white `,
    container: css([
      tw` p-3 bg-white border border-black-200 text-center dark:( bg-black-500 border-black-400 ) `,
    ]),
    link: css([
      tw` border border-black-200 p-2 bg-white block text-black-base dark:( border-yellow-300 text-yellow-300 bg-black-600 ) transition-all duration-200 `,
      tw` hover:( border-blue-500 text-blue-600 bg-blue-100 dark:( bg-yellow-300 text-black-base ) ) `,
    ]),
  };

  return (
    <>
      <Meta meta={{
        title: '페이지를 찾을 수 없습니다',
        url: router.asPath,
      }}
      />
      <div css={style.default}>
        <div css={style.container}>
          <h1 css={style.heading}>Error 404</h1>
          <p>페이지를 찾을 수 없습니다.</p>
          <Link href='/' as='/' css={style.link}>홈으로 돌아가기</Link>
        </div>
      </div>
    </>
  );
};

export default NotPound404;
