import { ParsedUrlQuery } from 'querystring';
import React, { useMemo } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { A, H } from '@/src/components/Base';
import { Pagination } from './Pagination';
import { PostItem } from './PostItem';
import { setCover } from '@/src/utils';
import { Ad } from './Ad';
import { IFrontMatter } from '@/src/types/mdx.types';

interface Props {
  posts: IFrontMatter[];
  listName: string;
  page?: ('index' | 'list');
  series?: boolean;
  styles?: TwStyle | SerializedStyles;
}

export interface PostPageQuery extends ParsedUrlQuery {
  pageNumber: string;
}

export function PostList({
  posts, listName, page = 'list', series = false, styles,
}: Props) {
  const router = useRouter();

  const query = router.query as PostPageQuery;

  const defaultCover = 'https://drive.google.com/file/d/1iF4WE-zae-TyU4A4s-yrqhHU4XQyPhfR/view?usp=drive_link';

  const startPost = useMemo(() => {
    return page === 'list'
      ? ((+query.pageNumber || 1) - 1) * 5
      : 0;
  }, [ query, ]);

  const endPost = useMemo(() => {
    return 5 * (+query.pageNumber || 1);
  }, [ query, ]);

  const style = {
    list: css([
      tw` flex flex-col gap-2 `,
      styles,
    ]),
    listName: css([
      tw` p-3 bg-black-base text-white dark:( bg-black-600 text-yellow-300 ) flex items-center gap-2 mb-2 shadow-md `,
    ]),
  };

  return (
    <>
      <div>
        <H styles={style.listName}>
          <Icon icon={series ? 'fontisto:list-1' : 'zondicons:list'} /> {listName}
        </H>
        <div css={style.list}>
          {!series && posts.slice(startPost, endPost).map((frontMatter) => (
            <PostItem key={frontMatter.id} post={frontMatter} />
          ))}
          {series && posts.map((frontMatter, index) => (
            <div
              key={`${frontMatter.title}-${frontMatter.id}`}
              tw='flex flex-row gap-2'
            >
              <div tw='bg-black-base dark:bg-yellow-300 basis-[50px] text-white dark:text-black-base p-2 flex items-center justify-center'>{index + 1}</div>
              <div tw='flex gap-5 p-3 bg-white border border-black-200 dark:( bg-black-500 border-black-400 ) w-full items-start'>
                <div tw='flex flex-col gap-2 flex-1 shrink-0'>
                  <div>
                    <H level='h3' type='postlist'>
                      <A href={`/posts/${frontMatter.id}`} type='postlist'>{frontMatter.title}</A>
                    </H>
                  </div>
                  <div tw='flex-1 shrink-0 text-[90%] text-black-base dark:text-white'>{frontMatter.description}</div>
                </div>
                <img
                  src={setCover(frontMatter.cover || defaultCover)}
                  alt={frontMatter.title}
                  tw='w-[150px] aspect-video'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Ad position='other' />

      {page === 'list' && (
        <Pagination posts={posts} query={query} />
      )}
    </>
  );
}
