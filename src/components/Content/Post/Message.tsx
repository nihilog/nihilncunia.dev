import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  color: ('r' | 'b' | 'g' | 'y');
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

const messageIcon = {
  r: 'humbleicons:times',
  g: 'material-symbols:check',
  b: 'material-symbols:info-outline',
  y: 'icon-park-outline:caution',
};

export function Message({ color, children, styles, }: Props) {
  const style = {
    default: css([
      tw` border-2 `,
      tw` [p]:( text-justify break-all ) `,
      color === 'r' && tw` border-red-500 bg-red-100 [p]:text-red-500! `,
      color === 'g' && tw` border-green-600 bg-green-100 [p]:text-green-600! `,
      color === 'b' && tw` border-blue-500 bg-blue-100 [p]:text-blue-500! `,
      color === 'y' && tw` border-gold-600 bg-gold-100 [p]:text-gold-700! `,
      styles,
    ]),
    top: css([
      tw` p-1 `,
      color === 'r' && tw` bg-red-500 text-white `,
      color === 'g' && tw` bg-green-600 text-white `,
      color === 'b' && tw` bg-blue-500 text-white `,
      color === 'y' && tw` bg-gold-600 text-white `,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <div css={style.top}>
          <Icon icon={messageIcon[color]} />
        </div>
        <div tw='space-y-2 p-2'>
          {children}
        </div>
      </div>
    </>
  );
}
