import React, {
  useCallback, useEffect, useState
} from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { allPosts } from '@contentlayer';
import { CategoryItem } from '../Content';
import { Nav } from './Nav';
import { linksData } from '@/src/data';
import { getCategories, getSeries } from '@/src/utils/mdx';
import { useAppDispatch, useAppSelector } from '@/src/hooks/rtk';
import { toggleMenu } from '@/src/reducers/dark.reducer';
import { SeriesItem } from '../Content/SeriesItem';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Side({ styles, }: Props) {
  const [ scrollY, setScrollY, ] = useState(0);
  // // const [ position, setPosition, ] = useState('0%');
  const { isOpen, width, } = useAppSelector((state) => state.dark);

  const postsCount = allPosts.length;
  const categories = getCategories();
  const serieses = getSeries();
  const dispatch = useAppDispatch();

  const onClickBackground = useCallback(
    () => {
      dispatch(toggleMenu());
    },
    []
  );

  useEffect(() => {
    const scrollEvent = () => {
      setScrollY(window.scrollY);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollEvent);
    }

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [ scrollY, ]);

  const style = {
    default: css([
      tw` w-[250px] flex flex-col gap-5 self-start transition-all duration-200 `,
      width >= 1024 && tw` [transform: translateX(0%)] `,
      width < 1024 && tw` fixed left-2 top-16 z-10 p-3 border border-black-200 shadow-lg bg-white shadow-black-base/50 dark:( border-black-400 bg-black-base ) `,
      width < 1024 && !isOpen && tw` [transform: translateX(-105%) translateY(-8px)] opacity-0 `,
      width < 1024 && isOpen && tw` [transform: translateX(0%) translateY(-8px)] opacity-100 `,
      styles,
    ]),
    background: css([
      tw` bg-black-base/70 w-screen h-screen fixed top-0 left-0 z-[1] `,
    ]),
    count: css([
      tw` text-[90%] inline-flex items-center justify-center py-1 px-2 ml-1 bg-black-300 dark:bg-black-400 text-white leading-[1] rounded-2 `,
    ]),
  };

  return (
    <>
      <aside css={style.default}>
        <Nav name='메뉴'>
          {linksData.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              as={link.as}
            >
              <Icon icon={link.icon} /> {link.label}
            </Link>
          ))}
        </Nav>

        <Nav name='시리즈'>
          {serieses.map((series) => (
            <SeriesItem
              key={series.name}
              href={`/series/${series.name}`}
              series={series.name}
              icon='fontisto:list-1'
              count={series.count}
            />
          ))}
        </Nav>

        <Nav name='카테고리'>
          <Link href='/posts'><Icon icon='bxs:category' /> 전체 포스트 <span css={style.count}>{postsCount}</span></Link>
          {categories.map((category) => (
            <CategoryItem
              key={category.name}
              href={`/categories/${category.name}`}
              category={category.name}
              icon='material-symbols:folder'
              count={category.count}
            />
          ))}
        </Nav>
      </aside>
      {isOpen && (
        <div css={style.background} onClick={onClickBackground} />
      )}
    </>
  );
}
