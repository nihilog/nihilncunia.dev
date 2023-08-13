import React from 'react';
import { Post, allPosts } from '@contentlayer';
import { GetStaticPaths, GetStaticProps } from 'next';
import { AppLayout } from '@/layouts';
import { PostMD } from '@/components/Content/MDX';

interface Props {
  post: Post;
}

export default function PostPage({ post, }: Props) {
  return (
    <>
      <AppLayout title='글'>
        <PostMD content={post.body.code} />
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
