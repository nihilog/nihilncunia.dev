import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Post, allPosts } from 'contentlayer/generated';
import { AppLayout } from '@/src/layouts';
import { ClosePost, PostMD } from '@/src/components/Content/MDX';

interface Props {
  post: Post;
}

export default function PostPage({ post, }: Props) {
  return (
    <>
      <AppLayout
        title={post.title}
        type='article'
        created={post.created}
        updated={post.updated}
        section={post.category}
        tags={post.tags.join(',')}
        author='NIHILncunia'
      >
        {post.published ? (
          <PostMD content={post.body.code} post={post} />
        ) : (
          <ClosePost post={post} />
        )}
      </AppLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((post) => ({
      params: {
        id: post.id.toString(),
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    id: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params, }: Params) => {
  const post = allPosts.find((post) => post.id === +params.id);

  return {
    props: {
      post,
    },
  };
};
