import React, { useCallback } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { useScroll } from '@/src/hooks';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function GoToTop({ styles, }: Props) {
  const scroll = useScroll();

  const onClickTop = useCallback(
    () => {
      window.scrollTo({ top: 0, behavior: 'smooth', });
    },
    []
  );
  const style = {
    default: css([
      tw` fixed bottom-2 right-2 z-10 border border-black-200 bg-white text-black-base p-1 transition-all duration-200 hover:( border-blue-500 text-blue-600 bg-blue-100 ) `,
      tw` dark:( border-white bg-black-500 text-white hover:( border-yellow-300 bg-yellow-300 text-black-base ) ) `,
      scroll.y > 1200
        ? tw` block `
        : tw` hidden `,
      tw` [svg]:( text-[150%] ) `,
      styles,
    ]),
  };

  return (
    <>
      <button css={style.default} onClick={onClickTop}>
        <Icon icon='mdi:arrow-top-thick' />
      </button>
    </>
  );
}
