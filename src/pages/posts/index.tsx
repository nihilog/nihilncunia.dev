import React from 'react';
import { GetStaticProps } from 'next';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { createPosts, getListMetaData } from '@/src/utils/mdx';
import { IFrontMatter } from '@/src/types/mdx.types';

interface Props {
  posts: IFrontMatter[];
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
  createPosts();
  const posts = getListMetaData(0, 6);

  return {
    props: {
      posts,
    },
  };
};
