import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
  label?: string;
  type?: ('post' | 'normal');
  external?: boolean;
  styles?: TwStyle | SerializedStyles;
}

export function A({
  href, children, label, type = 'normal', external, styles,
}: Props) {
  const style = {
    default: css([
      tw` font-semibold text-blue-500 hover:( text-blue-700 underline ) `,
      type === 'post' && (css`
        &:before {
          content: url('https://api.iconify.design/mingcute/link-fill.svg?color=%233898f9');
          margin-right: 4px;
        }

        &:hover {
          &:before {
            content: url('https://api.iconify.design/mingcute/link-fill.svg?color=%231a64db');
          }
        }
      `),
      styles,
    ]),
    external: css([
      tw` font-semibold text-green-500 hover:( underline text-green-600 ) `,
      tw` after:( ml-1 ) `,
      (css`
        &:after {
          content: url('https://api.iconify.design/iconamoon/link-external-bold.svg?color=%2322c55e');
        }

        &:hover {
          &:after {
            content: url('https://api.iconify.design/iconamoon/link-external-bold.svg?color=%2316a34a');
          }
        }
      `),
    ]),
  };

  return (
    <>
      {external ? (
        <a
          href={href}
          target='_blank'
          rel='noreferrer noopener'
          aria-label={label}
          css={style.external}
        >
          {children}
        </a>
      ) : (
        <Link href={href} css={style.default} aria-label={label}>
          {children}
        </Link>
      )}
    </>
  );
}
