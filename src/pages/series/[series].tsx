import React from 'react';
import { Post, allPosts } from '@contentlayer';
import { GetStaticPaths, GetStaticProps } from 'next';
import { AppLayout } from '@/layouts';
import { PostList } from '@/components/Content/Main';
import { getSeries } from '@/utils/mdx';

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
  const posts = allPosts
    .filter((post) => post.seriesName === params.series)
    .sort((a, b) => a.seriesOrder - b.seriesOrder);

  return {
    props: {
      posts,
      series: params.series,
    },
  };
};
