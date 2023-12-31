import React, { useCallback } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Giscus from '@giscus/react';
import { Icon } from '@iconify/react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useRouter } from 'next/router';
import { CustomMDX } from './CustomMDX';
import { A, H } from '@/src/components/Base';
import { dateFormat } from '@/src/utils/date';
import { setCover } from '@/src/utils';
import {
  Ad, GoToTop, OtherPosts, PostItem, Toc
} from '../Main';
import { useAppDispatch, useAppSelector } from '@/src/hooks/rtk';
import { Fb } from '../Post';
import { IFrontMatter } from '@/src/types/mdx.types';
import { getListMetaData } from '@/src/utils/mdx';
import { setPostId } from '@/src/reducers/dark.reducer';

interface Props {
  frontMatter: IFrontMatter;
  source: MDXRemoteSerializeResult;
  styles?: TwStyle | SerializedStyles;
}

export function PostMD({ frontMatter, source, styles, }: Props) {
  const isDark = useAppSelector(
    (state) => state.dark.isDark
  );

  console.log(source);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const cover = frontMatter.cover || 'https://drive.google.com/file/d/1iF4WE-zae-TyU4A4s-yrqhHU4XQyPhfR/view?usp=drive_link';

  const allPosts = getListMetaData();
  const postIndex = allPosts.reverse().findIndex((target) => target.id === frontMatter.id);

  const prevIndex = (postIndex - 1) < 0 ? null : (postIndex - 1);
  const nextIndex = (postIndex + 1) > allPosts.length ? null : (postIndex + 1);

  const prevPost = allPosts[prevIndex];
  const nextPost = allPosts[nextIndex];

  const editPost = useCallback(
    () => {
      dispatch(setPostId({
        value: frontMatter.id,
      }));

      router.push(`/posts/${frontMatter.id}/edit`);
    },
    [ frontMatter.id, ]
  );

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
    post: tw` p-3 pb-0 bg-white border border-b-0 border-black-200 dark:( bg-black-500 border-black-400 text-white ) space-y-8 shadow-md mt-5 `,
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
    postNavi: css([
      tw` mt-5 p-3 text-white bg-black-base font-black flex flex-row gap-1 items-center shadow-md mb-2 dark:( bg-black-600 text-yellow-300 ) `,
    ]),
    section: tw` flex items-center gap-2 pt-2 text-black-base dark:text-white `,
    giscus: css([
      tw` p-3 border border-black-200 shadow-md text-black-base bg-white dark:( border-black-400 bg-black-500 text-white ) `,
    ]),
    button: css([
      tw` mt-5 p-2 border border-blue-200 bg-blue-100 text-blue-600 transition-all duration-200 flex items-center justify-center gap-2 `,
      tw` hover:( border-blue-500 text-white bg-blue-500 ) `,
      tw` dark:( border-yellow-300 text-yellow-300 bg-black-500 hover:( bg-yellow-300 text-black-base ) ) `,
    ]),
  };

  return (
    <>
      <GoToTop />
      <article css={style.default}>
        <div css={style.title}>
          <H
            level='h1'
            type='normal'
            styles={tw`text-white dark:text-yellow-300 text-justify break-all flex items-center gap-2`}
          >
            <Icon icon='mdi:comment' /> {frontMatter.title}
          </H>
        </div>

        <div css={style.postInfo}>
          <div>
            <img
              src={setCover(cover)}
              alt={frontMatter.title}
              tw='border border-black-base/70 dark:border-white/50'
            />
          </div>
          <div css={style.section}>
            <div css={style.infoTitle}>카테고리</div>
            <A
              href={`/categories/${frontMatter.category || '분류없음'}`}
              styles={style.category}
            >
              <Icon icon='material-symbols:folder' /> {frontMatter.category || '분류없음'}
            </A>
          </div>
          <div css={style.section}>
            <div css={style.infoTitle}>태그</div>
            {frontMatter.tags.length > 0 && (
              <div tw='flex-1 shrink-0 flex items-center gap-2 flex-wrap'>
                {frontMatter.tags.map((tag) => (
                  <A key={tag} href={`/tags/${tag}`} styles={style.tag}>
                    <Icon icon='ph:hash-bold' /> {tag}
                  </A>
                ))}
              </div>
            )}
          </div>
          <div css={style.section}>
            <div css={style.infoTitle}>작성일자</div>
            <div>{dateFormat(frontMatter.created, 'YYYY-MM-DD HH:mm')}</div>
          </div>
          <div css={style.section}>
            <div css={style.infoTitle}>수정일자</div>
            <div>{dateFormat(frontMatter.updated, 'YYYY-MM-DD HH:mm')}</div>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div css={style.section}>
              <div css={style.infoTitle}>글 관리</div>
              <div>
                <button onClick={editPost} css={[ style.button, tw` mt-0 py-1 px-2 `, ]}>수정</button>
                {/* <Link href={`/posts/add?postIndex=${frontMatter.id}`}>수정</Link> */}
                {/* <Link href=''>삭제</Link> */}
              </div>
            </div>
          )}
        </div>

        <Ad position='top' />

        <div css={style.post} className='mdx-post'>
          <Toc />
          <MDXRemote {...source} components={CustomMDX} />
          {/* <MDXComponent components={CustomMDX} /> */}
        </div>

        <Fb />

        <OtherPosts category={frontMatter.category} postId={frontMatter.id} />

        <div css={style.giscus}>
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
            inputPosition='top'
            theme={isDark ? 'dark_dimmed' : 'light'}
            lang='ko'
            loading='lazy'
          />
        </div>

        <Ad position='bottom' />

        {prevPost && (
          <>
            <div css={style.postNavi}>
              <Icon icon='ic:twotone-keyboard-double-arrow-left' fontSize='130%' /> 이전 포스트
            </div>
            <PostItem post={prevPost} direction='left' />
          </>
        )}

        {nextPost && (
          <>
            <div css={[ style.postNavi, tw` justify-end `, ]}>
              다음 포스트 <Icon icon='ic:twotone-keyboard-double-arrow-right' fontSize='130%' />
            </div>
            <PostItem post={nextPost} />
          </>
        )}
      </article>
    </>
  );
}
