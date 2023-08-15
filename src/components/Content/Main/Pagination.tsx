import React, { useMemo } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { Post } from '@contentlayer';
import { A } from '@/components/Base';
import { PageNumber } from './PageNumber';
import { configData } from '@/data';
import { PostPageQuery } from './PostList';

interface Props {
  posts: Post[];
  query: PostPageQuery;
  styles?: TwStyle | SerializedStyles;
}

export function Pagination({ posts, query, styles, }: Props) {
  const firstPage = 1;
  const lastPage = useMemo(() => {
    return Math.floor(((posts.length - 1) / configData.postPerPage) + 1);
  }, []);

  const currentPage = +query.pageNumber || 1;
  const isFirst = currentPage === firstPage;
  const isLast = currentPage === lastPage;

  const pageNumbers = useMemo(() => {
    const groupStart = ((currentPage - 1) * configData.postPerPage) + 1;
    const groupEnd = () => {
      const end = currentPage * configData.postPerPage;

      if (end > lastPage) {
        return lastPage;
      }

      return end;
    };

    const numbers: number[] = [];

    for (let i = groupStart; i <= groupEnd(); i++) {
      numbers.push(i);
    }

    return numbers;
  }, []);

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
    pagination: css([
      tw` flex flex-row gap-2 items-stretch justify-center `,
    ]),
    disable: css([
      tw` text-black-400 bg-black-200 p-2 flex items-center justify-center rounded-1 shadow-md `,
    ]),
    enable: css([
      tw` flex items-center justify-center p-2 bg-white rounded-1 border border-black-200 hover:( bg-blue-200 border-blue-200 ) shadow-md `,
    ]),
  };

  return (
    <>
      <div css={style.pagination}>
        {isFirst ? (
          <>
            <span aria-label='first' css={style.disable}>
              <Icon icon='material-symbols:keyboard-double-arrow-left' />
            </span>
            <span aria-label='prev' css={style.disable}>
              <Icon icon='material-symbols:chevron-left' />
            </span>
          </>
        ) : (
          <>
            <A
              href='?pageNumber=1'
              label='first'
              styles={style.enable}
            >
              <Icon icon='material-symbols:keyboard-double-arrow-left' />
            </A>
            <A
              href={`?pageNumber=${currentPage - 1}`}
              label='prev'
              styles={style.enable}
            >
              <Icon icon='material-symbols:chevron-left' />
            </A>
          </>
        )}
        {pageNumbers.map((number) => (
          <PageNumber key={number} number={number} currentPage={currentPage} />
        ))}
        {isLast ? (
          <>
            <span aria-label='next' css={style.disable}>
              <Icon icon='material-symbols:chevron-right' />
            </span>
            <span aria-label='last' css={style.disable}>
              <Icon icon='material-symbols:keyboard-double-arrow-right' />
            </span>
          </>
        ) : (
          <>
            <A
              href={`?pageNumber=${currentPage + 1}`}
              label='next'
              styles={style.enable}
            >
              <Icon icon='material-symbols:chevron-right' />
            </A>
            <A
              href={`?pageNumber=${lastPage}`}
              label='last'
              styles={style.enable}
            >
              <Icon icon='material-symbols:keyboard-double-arrow-right' />
            </A>
          </>
        )}
      </div>
    </>
  );
}
