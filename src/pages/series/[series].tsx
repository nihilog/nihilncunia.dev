import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { createPosts, getListMetaData, getSeries } from '@/src/utils/mdx';
import { IFrontMatter } from '@/src/types/mdx.types';

interface Props {
  series: string;
  posts: IFrontMatter[];
}

export default function SeriesPage({ series, posts, }: Props) {
  return (
    <>
      <AppLayout title={`"${series}" 시리즈 관련 포스트`}>
        <PostList listName={`"${series}" 시리즈 관련 포스트 총 ${posts.length}건`} posts={posts} series />
      </AppLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getSeries().map((item) => ({
      params: {
        series: item.name,
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    series: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params, }: Params) => {
  createPosts();
  const posts = getListMetaData()
    .filter((post) => post.series.name === params.series)
    .sort((a, b) => a.series.order - b.series.order);

  return {
    props: {
      posts,
      series: params.series,
    },
  };
};
