import React from 'react';
import { GetStaticProps } from 'next';
import { Post, allPosts } from '@contentlayer';
import { AppLayout } from '@/layouts';
import { PostList } from '@/components/Content/Main';

interface Props {
  posts: Post[];
}

export default function IndexPage({ posts, }: Props) {
  return (
    <>
      <AppLayout title='홈'>
        <PostList listName='최근 포스트' posts={posts} page='index' />
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
