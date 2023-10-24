import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { createPosts, getCategories, getListMetaData } from '@/src/utils/mdx';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { IFrontMatter } from '@/src/types/mdx.types';

interface Props {
  posts: IFrontMatter[];
  category: string;
}

export default function CategoryPage({ posts, category, }: Props) {
  return (
    <>
      <AppLayout title={`${category} 관련 포스트`}>
        <PostList listName={`"${category}" 관련 포스트 총 ${posts.length}건`} posts={posts} />
      </AppLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getCategories().map((item) => ({
      params: {
        category: item.name,
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    category: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params, }: Params) => {
  createPosts();
  const posts = getListMetaData()
    .filter((post) => (post.category || '분류없음') === params.category)
    .sort((a, b) => b.id - a.id);

  return {
    props: {
      posts,
      category: params.category,
    },
  };
};
