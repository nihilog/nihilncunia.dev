import React from 'react';
import { GetStaticProps } from 'next';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { ICustomPost, getListMetadata } from '../utils/mdx';

interface Props {
  posts: ICustomPost[];
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
