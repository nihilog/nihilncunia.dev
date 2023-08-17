import React from 'react';
import { Post, allPosts } from '@contentlayer';
import { GetStaticProps } from 'next';
import { AppLayout } from '@/layouts';
import { PostList } from '@/components/Content/Main';

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
