import React from 'react';
import tw, { css } from 'twin.macro';
import { GetStaticProps } from 'next';
import { Icon } from '@iconify/react';
import { AppLayout } from '@/layouts';
import { ITags, getTags } from '@/utils/mdx';
import { A, H } from '@/components/Base';

interface Props {
  tags: ITags[];
}

export default function TagCloudPage({ tags, }: Props) {
  const style = {
    listName: css([
      tw` p-3 bg-black-base text-white flex items-center gap-2 mb-2 shadow-md `,
    ]),
    list: css([
      tw` flex flex-row gap-3 mt-[-8px] flex-wrap `,
      tw` [a]:( flex flex-row gap-1 items-center p-2 border border-black-200 bg-white text-black-base text-[90%] font-500 transition-all duration-200 [span]:( inline-flex items-center justify-center py-1 px-2 ml-1 bg-black-300 text-white leading-[1] rounded-2 transition-all duration-200 ) hover:( border-blue-500 text-blue-600 no-underline [span]:( bg-blue-600 text-white ) ) ) `,
    ]),
  };

  return (
    <>
      <AppLayout title='태그 클라우드'>
        <H styles={style.listName}>
          <Icon icon='ph:hash-bold' /> 태그 클라우드
        </H>
        <div css={style.list}>
          {tags.map((tag) => (
            <A key={`${tag.name}-${tag.count}`} href={`/tags/${tag.name}`}>
              <Icon icon='ph:hash-bold' /> {tag.name} <span>{tag.count}</span>
            </A>
          ))}
        </div>
      </AppLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const tags = getTags();

  return {
    props: {
      tags,
    },
  };
};
