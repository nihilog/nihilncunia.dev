import React from 'react';
import tw, { css } from 'twin.macro';
import { Icon } from '@iconify/react';
import { A, H } from '../../Base';
import { ICustomPost } from '@/src/utils/mdx';
import { dateFormat } from '@/src/utils/date';
import { setCover } from '@/src/utils';

interface Props {
  post: ICustomPost;
}

export function ClosePost({ post, }: Props) {
  const cover = post.cover || 'https://drive.google.com/file/d/1iF4WE-zae-TyU4A4s-yrqhHU4XQyPhfR/view?usp=drive_link';

  const style = {
    postInfo: tw` p-3 bg-white border border-black-200 shadow-md mb-5 dark:( bg-black-500 border-black-400 text-white ) `,
    title: tw` p-3 bg-black-base text-white dark:( bg-black-600 text-yellow-300 ) mb-2 shadow-md `,
    category: css([
      tw` p-1 px-2 bg-white text-black-base border border-black-200 dark:( border-black-400 bg-black-500 text-white ) text-[90%] font-500 inline-flex items-center gap-1 `,
      tw` hover:( no-underline border-blue-500 text-blue-600 bg-blue-100 dark:( border-yellow-300 text-yellow-300 bg-black-600 ) ) `,
      tw` transition-all duration-200 `,
    ]),
    tag: css([
      tw` p-1 px-2 bg-white text-black-base border border-black-200 dark:( border-black-400 bg-black-500 text-white ) text-[90%] font-500 inline-flex items-center `,
      tw` hover:( no-underline border-blue-500 text-blue-600 bg-blue-100 dark:( border-yellow-300 text-yellow-300 bg-black-600 ) ) `,
      tw` transition-all duration-200 `,
    ]),
    infoTitle: tw` text-black-base shrink-0 basis-[60px] mf-sm:basis-[80px] mf-md:basis-[90px] mf-lg:basis-[100px] dark:text-white `,
    section: tw` flex items-center gap-2 pt-2 text-black-base dark:text-white `,
  };

  return (
    <>
      <div css={style.title}>
        <H
          level='h1'
          type='normal'
          styles={tw`text-white dark:text-yellow-300 text-justify break-all flex items-center gap-2`}
        >
          <Icon icon='mingcute:lock-fill' /> 잠긴 포스트입니다
        </H>
      </div>

      <div css={style.postInfo}>
        <div>
          <img
            src={setCover(cover)}
            alt={post.title}
            tw='border border-black-base/70 dark:border-white/50'
          />
        </div>
        <div css={style.section}>
          <div css={style.infoTitle}>카테고리</div>
          <A
            href={`/categories/${post.category || '분류없음'}`}
            styles={style.category}
          >
            <Icon icon='material-symbols:folder' /> {post.category || '분류없음'}
          </A>
        </div>
        <div css={style.section}>
          <div css={style.infoTitle}>태그</div>
          {post.tags.length > 0 && (
            <div tw='flex-1 shrink-0 flex items-center gap-2 flex-wrap'>
              {post.tags.map((tag) => (
                <A key={tag} href={`/tags/${tag}`} styles={style.tag}>
                  <Icon icon='ph:hash-bold' /> {tag}
                </A>
              ))}
            </div>
          )}
        </div>
        <div css={style.section}>
          <div css={style.infoTitle}>작성일자</div>
          <div>{dateFormat(post.created, 'YYYY-MM-DD HH:mm')}</div>
        </div>
        <div css={style.section}>
          <div css={style.infoTitle}>수정일자</div>
          <div>{dateFormat(post.updated, 'YYYY-MM-DD HH:mm')}</div>
        </div>
        <div css={style.section}>
          <div css={style.infoTitle}>공개여부</div>
          <div>비공개</div>
        </div>
      </div>
    </>
  );
}
