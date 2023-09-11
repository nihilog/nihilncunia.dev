import React, { useEffect, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { A } from '@/src/components/Base';
import { PageNumber } from './PageNumber';
import { PostPageQuery } from './PostList';
import { textStyles } from '@/src/styles';
import { ICustomPost, getPageArray } from '@/src/utils/mdx';

interface Props {
  posts: ICustomPost[];
  query: PostPageQuery;
  styles?: TwStyle | SerializedStyles;
}

export function Pagination({ posts, query, styles, }: Props) {
  const [ currentPageArray, setCurrentPageArray, ] = useState<number[]>([]);

  const firstPage = 1;
  const { totalPage: lastPage, pages, } = getPageArray(posts);

  const currentPage = +query.pageNumber || 1;
  const isFirst = currentPage === firstPage;
  const isLast = currentPage === lastPage;

  const firstLink = '?pageNumber=1';
  const prevLink = `?pageNumber=${currentPage - 1}`;
  const nextLink = `?pageNumber=${currentPage + 1}`;
  const lastLink = `?pageNumber=${lastPage}`;

  useEffect(() => {
    console.log('currentPage >> ', currentPage);

    if (currentPage % 5 === 1) {
      setCurrentPageArray(pages[Math.floor(currentPage / 5)]);
    } else if (currentPage % 5 === 0) {
      setCurrentPageArray(pages[Math.floor(currentPage / 5) - 1]);
    }
  }, [ currentPage, posts, ]);

  const style = {
    default: css([
      tw` flex items-center justify-center `,
      styles,
    ]),
    pagination: css([
      tw` flex items-stretch justify-center gap-1 `,
    ]),
    disable: css([
      tw` p-2 border border-black-200 bg-black-50 dark:( border-black-300 bg-black-400 text-black-300 ) inline-flex items-center justify-center text-black-300 shadow-md `,
    ]),
    enable: css([
      tw` p-2 border border-black-200 bg-white dark:( bg-black-500 border-black-400 ) inline-flex items-center justify-center transition-all duration-200 shadow-md `,
      tw` hover:( text-blue-600 border-blue-500 bg-blue-100 dark:( border-yellow-300 text-yellow-300 bg-black-600 ) ) `,
    ]),
  };

  return (
    <>
      {posts.length > 0 && (
        <div css={style.default}>
          <div css={style.pagination}>
            {isFirst ? (
              <>
                <div css={style.disable}>
                  <span css={textStyles.hidden}>처음 페이지</span>
                  <Icon icon='material-symbols:keyboard-double-arrow-left' fontSize='1.3rem' />
                </div>
                <div aria-label='prev' css={style.disable}>
                  <span css={textStyles.hidden}>이전 페이지</span>
                  <Icon icon='material-symbols:chevron-left' fontSize='1.3rem' />
                </div>
              </>
            ) : (
              <>
                <A
                  href={firstLink}
                  label='first'
                  styles={style.enable}
                >
                  <span css={textStyles.hidden}>처음 페이지</span>
                  <Icon icon='material-symbols:keyboard-double-arrow-left' fontSize='1.3rem' />
                </A>
                <A
                  href={prevLink}
                  label='prev'
                  styles={style.enable}
                >
                  <span css={textStyles.hidden}>이전 페이지</span>
                  <Icon icon='material-symbols:chevron-left' fontSize='1.3rem' />
                </A>
              </>
            )}
            {currentPageArray?.map((number) => (
              <PageNumber key={number} number={number + 1} currentPage={currentPage} />
            ))}
            {isLast ? (
              <>
                <div aria-label='next' css={style.disable}>
                  <span css={textStyles.hidden}>다음 페이지</span>
                  <Icon icon='material-symbols:chevron-right' fontSize='1.3rem' />
                </div>
                <div aria-label='last' css={style.disable}>
                  <span css={textStyles.hidden}>마지막 페이지</span>
                  <Icon icon='material-symbols:keyboard-double-arrow-right' fontSize='1.3rem' />
                </div>
              </>
            ) : (
              <>
                <A
                  href={nextLink}
                  label='next'
                  styles={style.enable}
                >
                  <span css={textStyles.hidden}>다음 페이지</span>
                  <Icon icon='material-symbols:chevron-right' fontSize='1.3rem' />
                </A>
                <A
                  href={lastLink}
                  label='last'
                  styles={style.enable}
                >
                  <span css={textStyles.hidden}>마지막 페이지</span>
                  <Icon icon='material-symbols:keyboard-double-arrow-right' fontSize='1.3rem' />
                </A>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
