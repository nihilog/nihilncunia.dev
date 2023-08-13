import { ParsedUrlQuery } from 'querystring';
import React, { useMemo } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Post } from '@contentlayer';
import { useRouter } from 'next/router';
import { configData } from '@/data';

interface Props {
  posts: Post[];
  styles?: TwStyle | SerializedStyles;
}

interface PostPageQuery extends ParsedUrlQuery {
  pageNumber: string;
}

export function PostList({ posts, styles, }: Props) {
  const router = useRouter();

  const query = router.query as PostPageQuery;

  const start = useMemo(() => {
    return 0 + (+query.pageNumber || 0);
  }, [ query, ]);

  const end = useMemo(() => {
    return configData.postPerPage;
  }, []);

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        {posts.slice(start, end).map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </>
  );
}
