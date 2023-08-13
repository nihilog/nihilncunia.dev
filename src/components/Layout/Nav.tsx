import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { linksData } from '@/data';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Nav({ styles, }: Props) {
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <nav css={style.default}>
        {linksData.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            as={link.as}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
