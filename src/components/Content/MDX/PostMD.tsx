import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Giscus from '@giscus/react';
import { Post, allPosts } from '@contentlayer';
import { Icon } from '@iconify/react';
import { CustomMDX } from './CustomMDX';
import { A, H } from '@/components/Base';
import { dateFormat } from '@/utils/date';
import { setCover } from '@/utils';
import { Ad, PostItem } from '../Main';

interface Props {
  post: Post;
  content: string;
  styles?: TwStyle | SerializedStyles;
}

export function PostMD({ post, content, styles, }: Props) {
  const MDXComponent = useMDXComponent(content);

  const cover = post.cover || 'https://drive.google.com/file/d/1iF4WE-zae-TyU4A4s-yrqhHU4XQyPhfR/view?usp=drive_link';

  const postIndex = allPosts.reverse().findIndex((target) => target.id === post.id);

  const prevIndex = (postIndex - 1) < 0 ? null : (postIndex - 1);
  const nextIndex = (postIndex + 1) > allPosts.length ? null : (postIndex + 1);

  const prevPost = allPosts[prevIndex];
  const nextPost = allPosts[nextIndex];

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
    post: tw` p-3 bg-white border border-black-200 space-y-8 mb-5 shadow-md mt-5 `,
    postInfo: tw` p-3 bg-white border border-t-0 border-black-200 shadow-md mb-5 `,
    title: tw` p-3 bg-black-base text-white `,
    category: css([
      tw` p-1 px-2 bg-blue-500 text-white text-[90%] font-500 inline-flex items-center gap-1 `,
      tw` hover:( no-underline bg-blue-700 text-white ) `,
      tw` transition-all duration-200 `,
    ]),
    tag: css([
      tw` p-1 px-2 bg-blue-500 text-white text-[90%] font-500 inline-flex items-center `,
      tw` hover:( no-underline bg-blue-700 text-white ) `,
      tw` transition-all duration-200 `,
    ]),
    infoTitle: tw` text-black-base shrink-0 basis-[60px] mf-sm:basis-[80px] mf-md:basis-[90px] mf-lg:basis-[100px] `,
  };

  return (
    <>
      <article css={style.default}>
        <div css={style.title}>
          <H
            level='h1'
            type='normal'
            styles={tw`text-white text-justify break-all flex items-center gap-2`}
          >
            <Icon icon='mdi:comment' /> {post.title}
          </H>
        </div>

        <div css={style.postInfo}>
          <div>
            <img
              src={setCover(cover)}
              alt={post.title}
              tw='border border-black-base/70'
            />
          </div>
          <div tw='flex items-center gap-2 pt-2 text-black-base'>
            <div css={style.infoTitle}>카테고리</div>
            <A
              href={`/categories/${post.category}`}
              styles={style.category}
            >
              <Icon icon='material-symbols:folder' /> {post.category}
            </A>
          </div>
          <div tw='flex items-center gap-2 pt-2 text-black-base'>
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
          <div tw='flex items-center gap-2 pt-2 text-black-base'>
            <div css={style.infoTitle}>작성일자</div>
            <div>{dateFormat(post.created, 'YYYY-MM-DD HH:mm')}</div>
          </div>
          <div tw='flex items-center gap-2 pt-2 text-black-base'>
            <div css={style.infoTitle}>수정일자</div>
            <div>{dateFormat(post.updated, 'YYYY-MM-DD HH:mm')}</div>
          </div>
        </div>

        <Ad position='top' />

        <div css={style.post}>
          <MDXComponent components={CustomMDX} />
        </div>

        <div tw='p-3 border border-black-200 shadow-md text-black-base bg-white'>
          <Giscus
            id='comments'
            repo='nihilog/nihilncunia.dev'
            repoId='R_kgDOKGiVLg'
            category='Comments'
            categoryId='DIC_kwDOKGiVLs4CYkoI'
            mapping='pathname'
            strict='0'
            reactionsEnabled='1'
            emitMetadata='0'
            inputPosition='bottom'
            theme='preferred_color_scheme'
            lang='ko'
            loading='lazy'
          />
        </div>

        <Ad position='bottom' />

        {prevPost && (
          <>
            <div tw='mt-5 p-3 text-white bg-black-base font-black flex flex-row gap-1 items-center'>
              <Icon icon='ic:twotone-keyboard-double-arrow-left' fontSize='130%' /> 이전 포스트
            </div>
            <div tw='border border-t-0 border-black-200 shadow-md'>
              <PostItem post={prevPost} direction='left' />
            </div>
          </>
        )}

        {nextPost && (
          <>
            <div tw='mt-5 p-3 text-white bg-black-base font-black flex flex-row gap-1 items-center justify-end'>
              다음 포스트 <Icon icon='ic:twotone-keyboard-double-arrow-right' fontSize='130%' />
            </div>
            <div tw='border border-t-0 border-black-200 shadow-md'>
              <PostItem post={nextPost} />
            </div>
          </>
        )}
      </article>
    </>
  );
}
