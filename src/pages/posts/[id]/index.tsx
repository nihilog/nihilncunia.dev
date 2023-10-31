import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { AppLayout } from '@/src/layouts';
import { ClosePost, PostMD } from '@/src/components/Content/MDX';
import { createPosts, getListMetaData, getSinglePost } from '@/src/utils/mdx';
import { IPost } from '@/src/types/mdx.types';
import { dateFormat } from '@/src/utils/date';

interface Props {
  post: IPost;
}

export default function PostPage({ post, }: Props) {
  const { frontMatter, source, } = post;

  return (
    <>
      <AppLayout
        title={frontMatter.title}
        type='article'
        created={`${dateFormat(frontMatter.created, 'YYYY-MM-DDTHH:mm:ss.SSS')}Z`}
        updated={`${dateFormat(frontMatter.updated, 'YYYY-MM-DDTHH:mm:ss.SSS')}Z`}
        section={frontMatter.category}
        tags={frontMatter.tags.join(',')}
        author='NIHILncunia'
      >
        {frontMatter.published ? (
          <PostMD source={source} frontMatter={frontMatter} />
        ) : (
          <ClosePost post={post} />
        )}
      </AppLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getListMetaData().map((post) => ({
      params: {
        id: post.id.toString(),
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    id: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params, }: Params) => {
  createPosts();
  const post = await getSinglePost(+params.id);

  return {
    props: {
      post,
    },
  };
};
