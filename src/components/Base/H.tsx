import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  level?: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');
  type?: ('post' | 'normal');
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function H({
  level: Heading = 'h2', type = 'normal', children, styles,
}: Props) {
  const style = {
    default: css([
      tw`  `,
      type === 'normal' && tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <Heading css={style.default}>{children}</Heading>
    </>
  );
}
