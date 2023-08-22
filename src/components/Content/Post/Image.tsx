import React, { useCallback, useRef, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  src: string;
  alt: string;
  styles?: TwStyle | SerializedStyles;
}

export function Image({ src, alt, styles, }: Props) {
  const [ isPopup, setIsPopup, ] = useState(false);
  const checkRef = useRef<HTMLInputElement>(null);

  const onClickExpand = useCallback(
    () => {
      // console.log('확대합니다.');
      setIsPopup((prev) => !prev);
    },
    []
  );

  const style = {
    container: css([
      tw` text-center border border-black-200 bg-black-50 p-2 `,
      styles,
    ]),
    caption: css([
      tw` inline-flex gap-2 items-center break-all text-[90%] text-black-500 `,
    ]),
    img: css([
      tw` block border border-black-base/70 mb-2 `,
    ]),
    button: css([
      tw` absolute top-2 right-2 text-[150%] p-2 border border-black-200 bg-white text-black-base transition-all duration-200 `,
      tw` hover:( text-blue-600 border-blue-600 ) `,
    ]),
    imgBox: css([
      tw` w-full mf-sm:max-w-[500px] mx-auto relative `,
      (css`
        & button {
          opacity: 0;
        }

        &:hover button {
          opacity: 1;
        }
      `),
    ]),
  };

  return (
    <>
      <figure css={style.container}>
        <div css={style.imgBox}>
          <img
            src={src}
            alt={alt}
            css={style.img}
          />
          <button onClick={onClickExpand} title='클릭하면 확대됩니다.' css={style.button}>
            <Icon icon='fa6-solid:expand' />
          </button>
        </div>
        <figcaption css={style.caption}><Icon icon='ri:image-fill' /> {alt}</figcaption>
      </figure>
      {isPopup && (
        <div tw='fixed top-0 left-0 w-screen h-screen z-30 bg-black-base/70' onClick={() => checkRef.current.click()} />
      )}
      <input
        type='checkbox'
        checked={isPopup}
        onChange={onClickExpand}
        ref={checkRef}
      />

    </>
  );
}
