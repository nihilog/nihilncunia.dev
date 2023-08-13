import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function A({ href, children, styles, }: Props) {
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <Link href={href} css={style.default}>{children}</Link>
    </>
  );
}
