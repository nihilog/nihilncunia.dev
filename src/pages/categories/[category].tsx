import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Post, allPosts } from '@contentlayer';
import { getCategories } from '@/utils/mdx';
import { AppLayout } from '@/layouts';
import { PostList } from '@/components/Content/Main';

interface Props {
  posts: Post[];
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
  const posts = allPosts.filter((post) => post.category === params.category);

  return {
    props: {
      posts,
      category: params.category,
    },
  };
};
