import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { Icon } from '@iconify/react';
import { SerializedStyles } from '@emotion/react';
import { useReSize } from '@/src/hooks';
import { A, H } from '@/src/components/Base';
import { setCover } from '@/src/utils';
import { setDate } from '@/src/utils/date';
import { ICustomPost } from '@/src/utils/mdx';

interface Props {
  post: ICustomPost;
  direction?: ('left' | 'right');
  styles?: TwStyle | SerializedStyles;
}

export function PostItem({ post, direction = 'right', styles, }: Props) {
  const windowSize = useReSize();

  const cover = post.cover || 'https://drive.google.com/file/d/1iF4WE-zae-TyU4A4s-yrqhHU4XQyPhfR/view?usp=drive_link';

  const style = {
    box: css([
      tw` p-3 bg-white dark:bg-black-500 flex flex-row gap-5 shadow-md border border-black-200 dark:border-black-400 `,
      windowSize.width < 600 && tw` flex-col `,
      styles,
    ]),
    info: css([
      tw` flex flex-col gap-2 flex-1 shrink-0 `,
      ((windowSize.width >= 600) && (direction === 'left')) && tw` order-2 `,
      ((windowSize.width >= 600) && (direction === 'right')) && tw` order-1 `,
      (windowSize.width < 600) && tw` order-2 `,
    ]),
    category: css([
      tw` p-1 px-2 bg-white text-black-base border border-black-200 text-[90%] font-500 inline-flex items-center gap-1 dark:( border-black-400 bg-black-500 text-white ) `,
      tw` hover:( no-underline border-blue-500 text-blue-600 bg-blue-100 dark:( border-yellow-300 text-yellow-300 bg-black-600 ) ) `,
      tw` transition-all duration-200 `,
    ]),
    img: css([
      tw` aspect-video bg-black-base text-white border border-black-base/70 dark:( text-black-base border-white/50 ) `,
      ((windowSize.width >= 600) && (direction === 'left')) && tw` order-1 `,
      ((windowSize.width >= 600) && (direction === 'right')) && tw` order-2 `,
      (windowSize.width < 600) ? tw` w-full order-1 ` : tw` h-[150px] `,
    ]),
  };

  return (
    <>
      <div css={style.box}>
        <div css={style.info}>
          <H level='h3' type='postlist'>
            <A href={`/posts/${post.id}`} type='postlist'>{post.title}</A>
          </H>
          <p tw='flex-1 shrink-0 text-[90%] text-black-base dark:text-white'>{post.description}</p>
          <div tw='flex flex-row justify-between items-center text-black-base dark:text-white'>
            <A
              href={`/categories/${post.category || '분류없음'}`}
              styles={style.category}
            >
              <Icon icon='material-symbols:folder' /> {post.category || '분류없음'}
            </A>
            <p>{setDate(post.created)}</p>
          </div>
        </div>
        <img
          src={setCover(cover)}
          alt={post.title}
          css={style.img}
        />
      </div>
    </>
  );
}
