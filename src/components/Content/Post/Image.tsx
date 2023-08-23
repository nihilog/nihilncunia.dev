import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  src: string;
  alt: string;
  styles?: TwStyle | SerializedStyles;
}

export function Image({ src, alt, styles, }: Props) {
  const style = {
    container: css([
      tw` text-center border border-black-200 bg-black-50 p-2 `,
      styles,
    ]),
    caption: css([
      tw` inline-flex gap-2 items-center break-all text-[90%] text-black-500 `,
    ]),
    img: css([
      tw` block border-2 border-black-base/70 mb-2 `,
    ]),
    button: css([
      tw` absolute top-2 right-2 h-[40px] w-[40px] p-1 border border-black-200 bg-white text-black-base transition-all duration-200 flex items-center justify-center gap-1 [svg]:text-[150%] line-clamp-1 `,
      tw` hover:( text-blue-600 border-blue-600 w-[110px] ) `,
      tw` [span]:( hidden ) [&:hover span]:( block ) `,
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
            src={src}
            alt={alt}
            css={style.img}
          />
          <a
            href={src}
            target='_blank'
            aria-label='새 창에서 열기'
            css={style.button}
            rel='noreferrer noopener'
          >
            <Icon icon='fa6-solid:expand' /> <span tw='line-clamp-1'>크게 보기</span>
          </a>
        </div>
        <figcaption css={style.caption}><Icon icon='ri:image-fill' /> {alt}</figcaption>
      </figure>
    </>
  );
}
