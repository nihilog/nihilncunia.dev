import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

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
      tw` font-semibold text-blue-500 inline-flex items-baseline hover:( text-blue-700 underline ) `,
      type === 'post' && tw` [& > svg]:( self-center mr-[2px] pt-[2px] ) `,
      styles,
    ]),
    external: css([
      tw` font-semibold text-green-500 inline-flex items-baseline hover:( underline text-green-600 ) `,
      tw` [& > svg]:( self-center ml-1 pt-[2px] ) `,
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
          {children} <Icon icon='iconamoon:link-external-bold' fontSize='110%' />
        </a>
      ) : (
        <Link href={href} css={style.default} aria-label={label}>
          {type === 'normal' ? (
            <>
              {children}
            </>
          ) : (
            <>
              <Icon icon='mingcute:link-fill' fontSize='110%' /> {children}
            </>
          )}
        </Link>
      )}
    </>
  );
}
