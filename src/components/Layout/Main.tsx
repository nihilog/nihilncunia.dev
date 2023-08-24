import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useReSize } from '@/src/hooks';
import { Side } from './Side';
import { Content } from '@/src/layouts';

interface Props {
  styles?: TwStyle | SerializedStyles;
  children: React.ReactNode;
}

export function Main({ styles, children, }: Props) {
  const size = useReSize();

  const style = {
    default: css([
      size.width >= 1024 && tw` flex flex-row `,
      tw` gap-10 my-20 w-full `,
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
