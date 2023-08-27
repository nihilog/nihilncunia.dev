import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { setCover } from '@/src/utils';

interface Props {
  src: string;
  alt: string;
  drive?: boolean;
  styles?: TwStyle | SerializedStyles;
}

export function Image({
  src, alt, drive = false, styles,
}: Props) {
  const convertSrc = drive ? setCover(src) : src;

  const style = {
    container: css([
      tw` text-center border border-black-200 bg-black-50 p-2 dark:( border-black-400 bg-black-400 text-white ) `,
      styles,
    ]),
    caption: css([
      tw` inline-flex gap-2 items-center break-all text-[90%] text-black-500 dark:text-white `,
    ]),
    img: css([
      tw` block border-2 border-black-base/70 dark:border-white/70 mb-2 `,
    ]),
    button: css([
      tw` mt-5 p-2 border border-black-200 bg-white text-black-base transition-all duration-200 flex items-center justify-center gap-2 `,
      tw` hover:( text-blue-600 border-blue-600 ) `,
      tw` dark:( border-yellow-300 text-yellow-300 bg-black-500 hover:( bg-yellow-300 text-black-base ) ) `,
    ]),
    imgBox: css([
      tw` w-full mf-sm:max-w-[500px] mx-auto relative `,
      tw` [& a]:( opacity-0 ) [&:hover a]:( opacity-100 ) `,
    ]),
  };

  return (
    <>
      <figure className='nihil-imagebox' css={style.container}>
        <div css={style.imgBox}>
          <img
            src={convertSrc}
            alt={alt}
            css={style.img}
          />
        </div>
        <figcaption css={style.caption}><Icon icon='ri:image-fill' /> {alt}</figcaption>
        <a
          href={convertSrc}
          target='_blank'
          css={style.button}
          rel='noreferrer noopener'
        >
          <Icon icon='fa6-solid:expand' /> 새 창에서 보기
        </a>
      </figure>
    </>
  );
}
