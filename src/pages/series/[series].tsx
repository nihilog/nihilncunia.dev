import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Post } from 'contentlayer/generated';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { getListMetadata, getSeries } from '@/src/utils/mdx';

interface Props {
  series: string;
  posts: Post[];
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
  const posts = getListMetadata()
    .filter((post) => post.series.name === params.series)
    .sort((a, b) => a.series.order - b.series.order);

  return {
    props: {
      posts,
      series: params.series,
    },
  };
};
