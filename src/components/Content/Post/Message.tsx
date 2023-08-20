import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  color: ('r' | 'b' | 'g' | 'y');
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

const messageType = {
  r: '경고',
  g: '정보',
  b: '안내',
  y: '주의',
};

const messageIcon = {
  r: 'humbleicons:times',
  g: 'material-symbols:check',
  b: 'material-symbols:info-outline',
  y: 'icon-park-outline:caution',
};

export function Message({ color, children, styles, }: Props) {
  const style = {
    default: css([
      tw` p-2 border `,
      tw` [p]:( text-justify break-all ) `,
      color === 'r' && tw` border-red-400 bg-red-100 text-red-500 `,
      color === 'g' && tw` border-green-500 bg-green-100 text-green-600 `,
      color === 'b' && tw` border-blue-400 bg-blue-100 text-blue-500 `,
      color === 'y' && tw` border-gold-600 bg-gold-100 text-gold-700 `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <div tw='font-black text-[110%] flex items-center gap-1 leading-[1] mb-2'>
          <Icon icon={messageIcon[color]} fontSize='120%' /> {messageType[color]}
        </div>
        <div tw='space-y-2 font-500'>
          {children}
        </div>
      </div>
    </>
  );
}
