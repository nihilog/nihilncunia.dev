import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';

interface Props {
  n: number;
  content: string;
  styles?: TwStyle | SerializedStyles;
}

export function Fn({ n, content, styles, }: Props) {
  const style = {
    default: css([
      tw` border-b border-transparent text-blue-500 dark:text-yellow-300 inline-flex items-baseline hover:( text-blue-700 dark:text-gold-600 border-blue-700 dark:border-gold-600 ) `,
      styles,
    ]),
  };

  return (
    <>
      <sup id={`fn-${n}`} data-n={n} data-content={content} css={style.default}>
        <Link href={`#fb-${n}`}>[{n}]</Link>
      </sup>
    </>
  );
}
