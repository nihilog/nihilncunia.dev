import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  name: string;
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Nav({ name, children, styles, }: Props) {
  const style = {
    default: css([
      tw` w-full `,
      tw` [a]:( p-2 flex items-center gap-1 bg-white border border-t-0 border-black-200 transition-all duration-200 text-black-base ) `,
      tw` [a:hover]:( bg-blue-400 border-blue-400 text-white ) `,
      styles,
    ]),
    name: tw` flex items-center gap-1 p-2 bg-black-base text-white `,
  };

  return (
    <div>
      <h2 css={style.name}><Icon icon='eva:arrow-right-fill' /> {name}</h2>
      <nav css={style.default}>
        {children}
      </nav>
    </div>
  );
}
