import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Giscus from '@giscus/react';
import { CustomMDX } from './CustomMDX';

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
      <article css={style.default}>
        <div>
          <MDXComponent components={CustomMDX} />
        </div>

        <div>
          <Giscus
            id='comments'
            repo='nihilog/nihilncunia.dev'
            repoId='R_kgDOKGiVLg'
            category='Comments'
            categoryId='DIC_kwDOKGiVLs4CYkoI'
            mapping='pathname'
            strict='0'
            reactionsEnabled='1'
            emitMetadata='0'
            inputPosition='bottom'
            theme='preferred_color_scheme'
            lang='ko'
            loading='lazy'
          />
        </div>
      </article>
    </>
  );
}
