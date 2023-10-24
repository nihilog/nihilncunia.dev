import React from 'react';
import { GetStaticProps } from 'next';
import { IFrontMatter } from '../types/mdx.types';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { createPosts, getListMetaData } from '../utils/mdx';

interface Props {
  posts: IFrontMatter[];
}

export default function IndexPage({ posts, }: Props) {
  console.log(posts);

  return (
    <>
      <AppLayout title='홈'>
        <PostList listName='최근 포스트' posts={posts} page='index' />
      </AppLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  createPosts();
  const posts = getListMetaData(0, 6);

  return {
    props: {
      posts,
    },
  };
};
