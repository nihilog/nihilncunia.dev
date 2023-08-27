import React, { useEffect } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useRouter } from 'next/router';

interface Props {
  position: ('top' | 'bottom');
  styles?: TwStyle | SerializedStyles;
}

const adId = {
  top: '2632794048',
  bottom: '3494487568',
};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    adsbygoogle: {[key: string]: unknown}[];
  }
}

export function Ad({ position, styles, }: Props) {
  const { asPath, } = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [ asPath, ]);

  const style = {
    default: css([
      tw` bg-white border border-black-200 shadow-md mt-5 dark:( bg-black-500 border-black-400 text-white ) `,
      tw` [ins]:( min-h-[100px] max-h-[280px] ) `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default} key={`${asPath}-${position}`}>
        <ins
          className='adsbygoogle sizing'
          style={{ display: 'block', }}
          data-ad-client='ca-pub-9256396675875954'
          data-ad-slot={adId[position]}
          data-ad-format='auto'
          data-language='ko'
          data-full-width-responsive='true'
        />
      </div>
    </>
  );
}
