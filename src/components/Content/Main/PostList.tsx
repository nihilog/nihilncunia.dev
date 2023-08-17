import { ParsedUrlQuery } from 'querystring';
import React, { useMemo } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Post } from '@contentlayer';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { configData } from '@/data';
import { A, H } from '@/components/Base';
import { Pagination } from './Pagination';
import { setDate } from '@/utils/date';
import { useReSize } from '@/hooks';
import { setCover } from '@/utils';

interface Props {
  posts: Post[];
  listName: string;
  page?: ('index' | 'list');
  styles?: TwStyle | SerializedStyles;
}

export interface PostPageQuery extends ParsedUrlQuery {
  pageNumber: string;
}

export function PostList({
  posts, listName, page = 'list', styles,
}: Props) {
  const router = useRouter();
  const windowSize = useReSize();

  const query = router.query as PostPageQuery;

  const defaultCover = 'https://drive.google.com/file/d/1iF4WE-zae-TyU4A4s-yrqhHU4XQyPhfR/view?usp=drive_link';

  const startPost = useMemo(() => {
    return page === 'list'
      ? ((+query.pageNumber || 1) - 1) * 5
      : 0;
  }, [ query, ]);

  const endPost = useMemo(() => {
    return configData.postPerPage * (+query.pageNumber || 1);
  }, [ query, ]);

  const style = {
    list: css([
      tw` flex flex-col shadow-md border border-t-0 border-black-200 divide-y divide-black-200 mb-5 `,
      styles,
    ]),
    box: css([
      tw` p-3 bg-white flex flex-row gap-5 `,
      windowSize.width < 600 && tw` flex-col `,
    ]),
    category: css([
      tw` p-1 px-2 bg-blue-500 text-white text-[90%] font-500 inline-flex items-center gap-1 `,
      tw` hover:( no-underline bg-blue-700 text-white ) `,
      tw` transition-all duration-200 `,
    ]),
    img: css([
      tw` aspect-video bg-black-base text-white border border-black-base/50 `,
      windowSize.width < 600 ? tw` w-full order-1 ` : tw` h-[150px] order-2 `,
    ]),
    info: css([
      tw` flex flex-col gap-2 flex-1 shrink-0 `,
      windowSize.width < 600 ? tw` order-2 ` : tw` order-1 `,
    ]),
    listName: css([
      tw` p-3 bg-black-base text-white flex items-center gap-2 `,
    ]),
  };

  return (
    <>
      <div>
        <H styles={style.listName}>
          <Icon icon='zondicons:list' /> {listName}
        </H>
        <div css={style.list}>
          {posts.slice(startPost, endPost).map((post) => (
            <div key={post.id} css={style.box}>
              <div css={style.info}>
                <H level='h3' type='postlist'>
                  <A href={`/posts/${post.id}`}>
                    <span tw='text-[70%]'>{post.title}</span>
                  </A>
                </H>
                <p tw='flex-1 shrink-0 text-[90%] text-black-base'>{post.description}</p>
                <div tw='flex flex-row justify-between items-center text-black-base'>
                  <A
                    href={`/categories/${post.category}`}
                    styles={style.category}
                  >
                    <Icon icon='material-symbols:folder' /> {post.category}
                  </A>
                  <p>{setDate(post.created)}</p>
                </div>
              </div>
              <img
                src={post.cover || setCover(defaultCover)}
                alt={post.title}
                css={style.img}
              />
            </div>
          ))}
        </div>
      </div>

      {page === 'list' && (
        <Pagination posts={posts} query={query} />
      )}
    </>
  );
}
