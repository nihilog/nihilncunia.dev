import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useReSize } from '@/hooks';
import { Welcome } from '@/components/Content/Main';
import { Menu } from '@/components/Content';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Content({ children, styles, }: Props) {
  const size = useReSize();

  const style = {
    default: css([
      tw` flex flex-col gap-5 flex-1 shrink-0 `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <Welcome />
        {size.width < 1024 && (
          <Menu align='horizontal' />
        )}
        {children}
      </div>
    </>
  );
}
