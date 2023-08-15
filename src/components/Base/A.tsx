import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
  label?: string;
  styles?: TwStyle | SerializedStyles;
}

export function A({
  href, children, label, styles,
}: Props) {
  const style = {
    default: css([
      tw` font-semibold text-blue-500 hover:( text-blue-700 underline ) `,
      styles,
    ]),
  };

  return (
    <>
      <Link href={href} css={style.default} aria-label={label}>{children}</Link>
    </>
  );
}
