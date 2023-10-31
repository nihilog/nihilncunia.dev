import React, { useMemo } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { getOtherPosts } from '@/src/utils/mdx';
import { PostItem } from './PostItem';
import { H } from '../../Base';

interface Props {
  category: string;
  postId: number;
  styles?: TwStyle | SerializedStyles;
}

export function OtherPosts({ category, postId, styles, }: Props) {
  const otherPosts = useMemo(() => {
    return getOtherPosts(category, postId);
  }, [ category, ]);

  const style = {
    default: css([
      tw` p-3 pt-8 border border-t-0 border-black-200 dark:border-black-400 bg-white dark:bg-black-500 mb-5 shadow-md flex flex-col gap-2 `,
      tw` [h2]:( mb-7 ) `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <H type='post'>이런 포스트도 있어요</H>
        {otherPosts.map((post) => (
          <PostItem key={post.id} post={post} styles={tw`shadow-none dark:bg-black-600`} />
        ))}
      </div>
    </>
  );
}
