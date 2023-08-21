import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  title: string;
  id: string;
  styles?: TwStyle | SerializedStyles;
}

export function Youtube({ title, id, styles, }: Props) {
  const style = {
    container: css([
      tw` p-3 pt-0 bg-red-600 `,
      styles,
    ]),
    title: css([
      tw` flex items-center gap-1 text-white p-2 pl-0 `,
    ]),
    youtube: css([
      tw` w-full [iframe]:( w-full aspect-video ) border-2 border-black-base `,
    ]),
  };

  return (
    <>
      <figure css={style.container}>
        <figcaption css={style.title}>
          <Icon icon='ri:youtube-fill' /> {title}
        </figcaption>
        <div css={style.youtube}>
          <iframe
            title={title}
            id='video'
            src={`https://www.youtube.com/embed/${id}`}
            allow='encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </figure>
    </>
  );
}
