import React from 'react';
import { GetStaticProps } from 'next';
import { Post, allPosts } from 'contentlayer/generated';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';

interface Props {
  posts: Post[];
}

export default function PostListPage({ posts, }: Props) {
  return (
    <>
      <AppLayout title='포스트 목록'>
        <PostList listName={`전체 포스트 총 ${posts.length}건`} posts={posts} />
      </AppLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort((a, b) => {
    return b.id - a.id;
  });

  return {
    props: {
      posts,
    },
  };
};
