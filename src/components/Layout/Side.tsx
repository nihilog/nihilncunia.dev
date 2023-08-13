import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Menu } from '../Content';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Side({ styles, }: Props) {
  const style = {
    default: css([
      tw` flex flex-col gap-2 `,
      styles,
    ]),
  };

  return (
    <aside css={style.default}>
      <Menu align='vertical' />
    </aside>
  );
}
