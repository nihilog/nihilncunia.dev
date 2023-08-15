import React from 'react';
import { GetStaticProps } from 'next';
import { Post, allPosts } from '@contentlayer';
import { AppLayout } from '@/layouts';
import { PostList } from '@/components/Content/Main';
import { H } from '@/components/Base';

interface Props {
  posts: Post[];
}

export default function IndexPage({ posts, }: Props) {
  return (
    <>
      <AppLayout title='홈'>
        <H>최근 포스트</H>
        <PostList posts={posts} page='index' />
      </AppLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts
    .sort((a, b) => b.id - a.id)
    .slice(0, 6);

  return {
    props: {
      posts,
    },
  };
};
