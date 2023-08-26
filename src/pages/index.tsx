import React from 'react';
import { GetStaticProps } from 'next';
import { Post } from 'contentlayer/generated';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { getListMetadata } from '../utils/mdx';

interface Props {
  posts: Partial<Post>[];
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
  const posts = getListMetadata(0, 6);

  return {
    props: {
      posts,
    },
  };
};
