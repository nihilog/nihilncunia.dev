import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { createPosts, getArchive, getListMetaData } from '@/src/utils/mdx';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { IFrontMatter } from '@/src/types/mdx.types';

interface Props {
  posts: IFrontMatter[];
  archive: string;
}

export default function ArchiveItemPage({ posts, archive, }: Props) {
  return (
    <>
      <AppLayout title={`${archive} 관련 포스트`}>
        <PostList listName={`"${archive}" 관련 포스트 총 ${posts.length}건`} posts={posts} />
      </AppLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getArchive().map((item) => ({
      params: {
        archive: item.name,
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    archive: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params, }: Params) => {
  createPosts();
  const posts = getListMetaData()
    .filter((post) => (
      post.created.startsWith(params.archive)
    ));

  return {
    props: {
      posts,
      archive: params.archive,
    },
  };
};
