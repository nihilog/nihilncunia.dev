import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useReSize } from '@/hooks';
import { Side } from './Side';
import { Content } from '@/layouts';

interface Props {
  styles?: TwStyle | SerializedStyles;
  children: React.ReactNode;
}

export function Main({ styles, children, }: Props) {
  const size = useReSize();

  const style = {
    default: css([
      tw` flex flex-row gap-10 `,
      styles,
    ]),
  };

  return (
    <>
      <main css={style.default}>
        {size.width >= 1000 && (
          <Side />
        )}
        <Content>
          {children}
        </Content>
      </main>
    </>
  );
}
