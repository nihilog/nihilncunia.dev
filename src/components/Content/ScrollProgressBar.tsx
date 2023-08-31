import React from 'react';
import tw, { TwStyle, css, theme } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useScroll } from '@/src/hooks';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function ScrollProgressBar({ styles, }: Props) {
  const scroll = useScroll();

  console.log(scroll.progress);

  const style = {
    default: css([
      tw` fixed top-0 left-0 m-0! w-full bg-blue-100 `,
      (css`
        & > div {
          width: ${scroll.progress}%;
          height: 8px;
          background-color: ${theme('colors.blue.400')};
          transition: width .3s ease;
        }
      `),
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <div />
      </div>
    </>
  );
}
