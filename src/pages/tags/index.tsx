import React from 'react';
import tw, { css } from 'twin.macro';
import { GetStaticProps } from 'next';
import { Icon } from '@iconify/react';
import { AppLayout } from '@/src/layouts';
import { ITags, createPosts, getTags } from '@/src/utils/mdx';
import { A, H } from '@/src/components/Base';

interface Props {
  tags: ITags[];
}

export default function TagCloudPage({ tags, }: Props) {
  const style = {
    listName: css([
      tw` p-3 bg-black-base text-white flex items-center gap-2 mb-2 shadow-md `,
      tw` dark:( bg-black-600 text-yellow-300 ) `,
    ]),
    list: css([
      tw` flex flex-row gap-3 flex-wrap `,
    ]),
    tag: css([
      tw` shadow-md flex flex-row items-center gap-1 p-2 border border-black-200 bg-white text-black-base text-[90%] font-500 transition-all duration-200 `,
      tw` [span]:( inline-flex items-center justify-center py-1 px-2 ml-1 bg-black-300 text-white leading-[1] rounded-2 transition-all duration-200 ) `,
      tw` hover:( border-blue-500 text-blue-600 bg-blue-100 no-underline [span]:( bg-blue-600 text-white ) ) `,
      tw` dark:( border-black-400 bg-black-500 text-white [span]:( bg-white text-black-base ) hover:( border-yellow-300 text-yellow-300 bg-black-600 [span]:( bg-yellow-300 text-black-base ) ) ) `,
    ]),
  };

  return (
    <>
      <AppLayout title='태그 클라우드'>
        <div>
          <H styles={style.listName}>
            <Icon icon='ph:hash-bold' /> 태그 클라우드
          </H>
          <div css={style.list}>
            {tags.map((tag) => (
              <A key={`${tag.name}-${tag.count}`} href={`/tags/${tag.name}`} styles={style.tag}>
                <Icon icon='ph:hash-bold' /> {tag.name} <span>{tag.count}</span>
              </A>
            ))}
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  createPosts();
  const tags = getTags();

  return {
    props: {
      tags,
    },
  };
};
