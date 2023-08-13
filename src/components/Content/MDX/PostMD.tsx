import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { CustomMDX } from './CustomMDX';
import { GisCus } from './GisCus';

interface Props {
  content: string;
  styles?: TwStyle | SerializedStyles;
}

export function PostMD({ content, styles, }: Props) {
  const MDXComponent = useMDXComponent(content);
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <MDXComponent components={CustomMDX} />
        <GisCus />
      </div>
    </>
  );
}
