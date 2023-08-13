import React from 'react';
import { Post, allPosts } from '@contentlayer';
import { GetStaticProps } from 'next';
import { AppLayout } from '@/layouts';
import { PostList } from '@/components/Content/Main';
import { H } from '@/components/Base';

interface Props {
  posts: Post[];
}

export default function PostListPage({ posts, }: Props) {
  return (
    <>
      <AppLayout title='포스트 목록'>
        <H>포스트 총 {posts.length}건</H>
        <PostList posts={posts} />
      </AppLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: allPosts,
    },
  };
};
