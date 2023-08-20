import React from 'react';
import { Post, allPosts } from '@contentlayer';
import { GetStaticPaths, GetStaticProps } from 'next';
import { AppLayout } from '@/layouts';
import { PostList } from '@/components/Content/Main';
import { getTags } from '@/utils/mdx';

interface Props {
  tag: string;
  posts: Post[];
}

export default function TagPage({ tag, posts, }: Props) {
  return (
    <>
      <AppLayout title={`"${tag}" 관련 포스트`}>
        <PostList listName={`"${tag}" 관련 포스트 총 ${posts.length}건`} posts={posts} />
      </AppLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getTags().map((item) => ({
      params: {
        tag: item.name,
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    tag: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params, }: Params) => {
  const posts = allPosts
    .filter((post) => post.tags.includes(params.tag))
    .sort((a, b) => b.id - a.id);

  return {
    props: {
      posts,
      tag: params.tag,
    },
  };
};
