import React, {
  FormEvent,
  MouseEvent, useCallback, useEffect, useState
} from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import { useInput } from '@/src/hooks';
import { useAppDispatch, useAppSelector } from '@/src/hooks/rtk';
import { setKeyword, setPosts } from '@/src/reducers/dark.reducer';
import { getListMetaData } from '@/src/utils/mdx';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function SearchBar({ styles, }: Props) {
  const [ show, setShow, ] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { headerHeight, posts, } = useAppSelector(
    (state) => state.dark
  );

  const keyword = useInput<HTMLInputElement>('keyword');

  const onShowSearch = useCallback(
    () => {
      setShow(true);
    },
    []
  );

  const onCloseSearch = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if ((event.currentTarget as Element).classList.contains('nihil-searchbar')) {
        return;
      }

      setShow(false);
    },
    []
  );

  const onSubmitSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      dispatch(setKeyword({
        value: keyword.data.value,
      }));

      const posts = getListMetaData().filter(
        (item) => item.title.includes(keyword.data.value)
      );

      dispatch(setPosts({
        value: posts,
      }));

      router.push('/search?pageNumber=1');
      setShow(false);
      keyword.setValue('');
    },
    [ keyword.data, posts, ]
  );

  useEffect(() => {
    const wheelHandler = (event: Event) => {
      if (show) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', wheelHandler, { passive: false, });

    return () => {
      window.removeEventListener('wheel', wheelHandler);
    };
  }, [ show, ]);

  const style = {
    bar: css([
      tw` fixed top-1/2 left-1/2 w-[90%] p-3 flex flex-row items-center text-black-base z-[110] translate-x-[-50%] translate-y-[-50%] bg-white border border-black-200 `,
      tw` dark:( border-black-400 bg-black-500 text-white ) `,
      styles,
    ]),
    input: css([
      tw` shrink-0 flex-1 p-2 outline-none dark:bg-black-600 border border-r-0 border-blue-500 dark:border-yellow-300 `,
    ]),
    searchButton: css([
      tw` p-2 basis-[60px] bg-blue-500 text-white self-stretch text-[150%] flex items-center justify-center dark:( bg-yellow-300 text-black-base ) `,
    ]),
    button: css([
      tw` fixed right-2 z-10 border border-black-200 bg-white text-black-base p-1 transition-all duration-200 hover:( border-blue-500 text-blue-600 bg-blue-100 ) `,
      tw` dark:( border-white bg-black-500 text-white hover:( border-yellow-300 bg-yellow-300 text-black-base ) ) `,
      tw` [svg]:( text-[150%] ) `,
      (css`
        top: ${headerHeight + 8}px;
      `),
    ]),
    back: css([
      tw` fixed top-0 left-0 w-screen h-screen bg-black-base/80 m-0! p-0! z-[100] overflow-x-hidden flex items-center justify-center`,
    ]),
  };

  return (
    <>
      <button onClick={onShowSearch} css={style.button}>
        <Icon icon='material-symbols:search' />
      </button>
      {show && (
        <>
          <div onClick={onCloseSearch} css={style.back} />
          <form onSubmit={onSubmitSearch} className='nihil-searchbar' css={style.bar}>
            <input
              type='text'
              placeholder='검색어를 입력하세요.'
              autoComplete='off'
              {...keyword.data}
              css={style.input}
            />
            <button css={style.searchButton}>
              <Icon icon='material-symbols:search' />
            </button>
          </form>
        </>
      )}
    </>
  );
}
