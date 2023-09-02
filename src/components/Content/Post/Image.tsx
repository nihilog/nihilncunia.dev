import React, {
  useCallback, useEffect, useState
} from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { Global, SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
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
  const [ click, setClick, ] = useState(false);
  const [ images, setImages, ] = useState<{ src: string, alt: string}[]>([]);
  const [ currentIndex, setCurrentIndex, ] = useState(0);
  const router = useRouter();

  const convertSrc = drive ? setCover(src) : src;

  const onClickOpen = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      setClick(true);

      const findImage = images.find(
        (img) => img.src === event.currentTarget.src
      );

      setCurrentIndex(images.indexOf(findImage));
    },
    [ images, ]
  );

  const onClickClose = useCallback(
    () => {
      setClick(false);
    },
    []
  );

  const goToPreviousImage = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [ currentIndex, ]);

  const goToNextImage = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [ currentIndex, ]);

  useEffect(() => {
    const images = [
      ...document.querySelectorAll('figure.nihil-imagebox img'),
    ] as HTMLImageElement[];

    const imageSrcs = images.map((img) => ({
      src: img.src,
      alt: img.alt,
    }));

    setImages(imageSrcs);
  }, [ router.asPath, ]);

  useEffect(() => {
    const wheelHandler = (event: Event) => {
      if (click) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', wheelHandler, { passive: false, });

    return () => {
      window.removeEventListener('wheel', wheelHandler);
    };
  }, [ click, ]);

  const style = {
    container: css([
      tw` text-center border border-black-200 bg-black-50 p-2 dark:( border-black-400 bg-black-400 text-white ) `,
      styles,
    ]),
    caption: css([
      tw` inline-flex gap-2 items-center break-all text-[90%] text-black-500 dark:text-white `,
    ]),
    img: css([
      tw` cursor-pointer transition-all duration-200 select-none `,
    ]),
    button: css([
      tw` mt-5 p-2 border border-black-200 bg-white text-black-base transition-all duration-200 flex items-center justify-center gap-2 `,
      tw` hover:( text-blue-600 border-blue-600 ) `,
      tw` dark:( border-yellow-300 text-yellow-300 bg-black-500 hover:( bg-yellow-300 text-black-base ) ) `,
    ]),
    imgBox: css([
      tw` w-full mf-sm:max-w-[700px] mx-auto relative overflow-hidden block border-2 border-black-base/70 dark:border-white/70 mb-2 `,
    ]),
    lightbox: css([
      tw` fixed z-40 top-0 left-0 bg-black-base/90 m-0! w-screen h-screen select-none `,
      tw` [>img]:( absolute top-[50%] translate-y-[-50%] max-w-[90vw] max-h-[90vh] left-[50%] translate-x-[-50%] border border-white scale-100 ) `,
      tw` [>button.prev-button]:( absolute top-[50%] translate-y-[-50%] text-white text-[2rem] left-5 bg-transparent border-2 border-white p-2 rounded-[50%] transition-colors duration-200 hover:( bg-white text-black-base ) ) `,
      tw` [>button.next-button]:( absolute top-[50%] translate-y-[-50%] text-white text-[2rem] right-5 bg-transparent border-2 border-white p-2 rounded-[50%] transition-colors duration-200 hover:( bg-white text-black-base ) ) `,
      tw` [>button.close]:( text-white absolute text-[3rem] top-5 right-5 ) `,
    ]),
    count: css([
      tw` text-white absolute text-big bottom-2 left-[50%] translate-x-[-50%] `,
    ]),
    global: css([
      (css`
        ::-webkit-scrollbar {
          display: none;
        }
      `),
    ]),
  };

  return (
    <>
      {click && (
        <>
          <Global styles={style.global} />
          <div css={style.lightbox}>
            <button className='close' onClick={onClickClose}>
              <Icon icon='typcn:times' />
            </button>
            <img
              className='current-image'
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
            />

            {currentIndex > 0 && (
              <button className='prev-button' onClick={goToPreviousImage}>
                <Icon icon='ooui:next-rtl' />
              </button>
            )}

            {currentIndex < images.length - 1 && (
              <button className='next-button' onClick={goToNextImage}>
                <Icon icon='ooui:next-ltr' />
              </button>
            )}

            <div css={style.count}>
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </>
      )}
      <figure className='nihil-imagebox' css={style.container}>
        <div css={style.imgBox}>
          <img
            src={convertSrc}
            alt={alt}
            css={style.img}
            onClick={onClickOpen}
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
