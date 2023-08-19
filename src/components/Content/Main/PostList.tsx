import { ParsedUrlQuery } from 'querystring';
import React, { useMemo } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Post } from '@contentlayer';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { configData } from '@/data';
import { H } from '@/components/Base';
import { Pagination } from './Pagination';
import { PostItem } from './PostItem';

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

  const query = router.query as PostPageQuery;

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
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>

      {page === 'list' && (
        <Pagination posts={posts} query={query} />
      )}
    </>
  );
}
