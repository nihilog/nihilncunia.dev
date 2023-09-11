import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useReSize } from '@/src/hooks';
import { Side } from './Side';
import { Content } from '@/src/layouts';
import { useAppSelector } from '@/src/hooks/rtk';

interface Props {
  styles?: TwStyle | SerializedStyles;
  children: React.ReactNode;
}

export function Main({ styles, children, }: Props) {
  const headerHeight = useAppSelector((state) => state.dark.headerHeight);
  const size = useReSize();

  const style = {
    default: css([
      size.width >= 1024 && tw` flex flex-row `,
      tw` gap-10 mb-10 w-full overflow-hidden `,
      (css`
        margin-top: ${headerHeight + 40}px;
      `),
      styles,
    ]),
  };

  return (
    <>
      <main css={style.default}>
        <Side />
        <Content>
          {children}
        </Content>
      </main>
    </>
  );
}
