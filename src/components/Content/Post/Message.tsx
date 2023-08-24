import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  color: ('r' | 'b' | 'g' | 'y');
  title?: string;
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

const messageIcon = {
  r: 'clarity:times-circle-solid',
  g: 'icon-park-solid:check-one',
  b: 'ic:sharp-info',
  y: 'material-symbols:warning',
};

export function Message({
  color, title, children, styles,
}: Props) {
  const style = {
    default: css([
      tw` border-2 `,
      tw` [p]:( text-justify break-all ) `,
      color === 'r' && tw` border-red-500 bg-red-100 [p]:text-red-500! `,
      color === 'g' && tw` border-green-600 bg-green-100 [p]:text-green-600! `,
      color === 'b' && tw` border-blue-500 bg-blue-100 [p]:text-blue-500! `,
      color === 'y' && tw` border-amber-600 bg-orange-100 [p]:text-amber-600! `,
      styles,
    ]),
    top: css([
      tw` p-1 flex items-center gap-1 `,
      color === 'r' && tw` bg-red-500 text-white [p]:text-inherit! `,
      color === 'g' && tw` bg-green-600 text-white [p]:text-inherit! `,
      color === 'b' && tw` bg-blue-500 text-white [p]:text-inherit! `,
      color === 'y' && tw` bg-amber-600 text-white [p]:text-inherit! `,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <div css={style.top}>
          <Icon icon={messageIcon[color]} />
          <p>{title}</p>
        </div>
        <div tw='space-y-2 p-2'>
          {children}
        </div>
      </div>
    </>
  );
}
