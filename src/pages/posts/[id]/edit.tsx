import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { useRouter } from 'next/router';
import { getFrontMatter, getPostContent } from '@/src/utils/mdx';
import { AppLayout } from '@/src/layouts';
import { useAppSelector } from '@/src/hooks/rtk';
import { H } from '@/src/components/Base';
import { InputElementState, TextAreaElementState, useInput } from '@/src/hooks';
import { Nihil } from '@/src/utils';

export default function EditPostPage() {
  const postId = useAppSelector(
    (state) => state.dark.postId
  );

  const frontMatter = getFrontMatter(postId);
  const postContent = getPostContent(postId);
  const router = useRouter();

  const id = useInput<HTMLInputElement>('id', frontMatter.id);
  const title = useInput<HTMLInputElement>('title', frontMatter.title);
  const desc = useInput<HTMLTextAreaElement>('description', frontMatter.description);
  const cover = useInput<HTMLInputElement>('cover', frontMatter.cover);
  const category = useInput<HTMLInputElement>('category', frontMatter.category);
  const tags = useInput<HTMLInputElement>('tags', frontMatter.tags.join(','));

  const inputs = [
    id.data, title.data, desc.data, cover.data, category.data,
    tags.data,
  ];

  const frontMatterKeys = Object.keys(frontMatter)
    .filter((item) => item !== 'created')
    .filter((item) => item !== 'updated')
    .filter((item) => item !== 'series')
    .filter((item) => item !== 'published');

  const labels = [
    '글 ID', '제목', '설명', '썸네일', '카테고리',
    '태그',
  ];

  const onClickBack = useCallback(() => {
    router.back();
  }, []);

  const style = {
    default: css([
      tw`  `,
    ]),
    title: css([
      tw` p-3 bg-black-base text-white dark:( bg-black-600 text-yellow-300 ) flex items-center gap-2 mb-2 shadow-md `,
    ]),
    box: css([
      tw` border border-black-200 bg-white text-black-base p-3 space-y-2 `,
      tw` dark:( border-black-400 bg-black-500 text-white ) `,
      tw` [p]:( text-justify break-all ) `,
    ]),
    label: css([
      tw` flex flex-col gap-1 `,
    ]),
    input: css([
      tw` p-2 bg-white text-black-base border border-black-200 dark:( border-black-400 bg-black-500 text-white ) font-500 inline-flex items-center outline-none `,
      tw` hover:( no-underline border-blue-500 dark:( border-yellow-300 ) ) `,
      tw` transition-all duration-200 `,
    ]),
    textBox: css([
      tw` p-2 bg-white text-black-base border border-black-200 dark:( border-black-400 bg-black-500 text-white ) font-500 inline-flex items-center resize-none w-full h-[120px] outline-none `,
      tw` hover:( no-underline border-blue-500 dark:( border-yellow-300 ) ) `,
      tw` transition-all duration-200 `,
    ]),
    back: css([
      tw`p-2 flex flex-row items-center justify-center gap-1 bg-white border border-black-200 transition-all duration-200 text-black-base shadow-md dark:( bg-black-500 border-black-400 text-white ) `,
      tw` hover:( text-blue-600 border-blue-500 bg-blue-100 dark:( border-yellow-300 text-yellow-300 bg-black-600 ) ) `,
    ]),
  };

  return (
    <>
      <AppLayout title={`글 수정 - ${frontMatter.title}`}>
        <button onClick={onClickBack} css={style.back}>뒤로가기</button>
        <div>
          <H styles={style.title}>글 정보</H>
          <div css={style.box}>
            {frontMatterKeys.map((item, index) => (
              <label key={Nihil.uuid()} htmlFor={item} css={style.label}>
                <span className='font-900'>{labels[index]}</span>
                {item === 'description' ? (
                  <textarea
                    id={(inputs[index] as TextAreaElementState).id}
                    ref={(inputs[index] as TextAreaElementState).ref}
                    onChange={(inputs[index] as TextAreaElementState).onChange}
                    defaultValue={(inputs[index] as TextAreaElementState).value}
                    css={style.textBox}
                  />
                ) : (
                  <input
                    type='text'
                    {...(inputs[index] as InputElementState)}
                    css={style.input}
                  />
                )}
              </label>
            ))}
          </div>
        </div>

        <div>
          <H styles={style.title}>글 본문</H>
          <div css={style.box}>
            <textarea
              defaultValue={postContent.content}
              css={[ style.textBox, tw` h-[600px] `, ]}
            />
          </div>
        </div>
      </AppLayout>
    </>
  );
}
