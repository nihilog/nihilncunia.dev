import React from 'react';
import { GetStaticProps } from 'next';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { ICustomPost, getListMetadata } from '@/src/utils/mdx';

interface Props {
  posts: ICustomPost[];
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
  const posts = getListMetadata(0, 6);

  return {
    props: {
      posts,
    },
  };
};
