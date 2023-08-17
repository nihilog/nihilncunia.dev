import React, { useCallback, useEffect, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { allPosts } from '@contentlayer';
import { MenuItem } from '../Content';
import { Nav } from './Nav';
import { linksData } from '@/data';
import { getCategories } from '@/utils/mdx';
import { useReSize } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { toggleMenu } from '@/reducers/dark.reducer';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Side({ styles, }: Props) {
  const [ scrollY, setScrollY, ] = useState(0);
  const [ position, setPosition, ] = useState('0%');
  const { isOpen, } = useAppSelector((state) => state.dark);

  const postsCount = allPosts.length;
  const categories = getCategories();
  const windowSize = useReSize();
  const dispatch = useAppDispatch();

  const onClickBackground = useCallback(
    () => {
      dispatch(toggleMenu());
    },
    []
  );

  useEffect(() => {
    if (isOpen) {
      setPosition('0%');
    } else {
      setPosition('-105%');
    }
  }, [ isOpen, ]);

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
      tw` w-[250px] p-3 flex flex-col gap-5 border border-black-200 shadow-lg shadow-black-base/50 bg-white self-start overflow-y-auto transition-all duration-200 `,
      windowSize.width < 1024 && tw` fixed left-2 top-16 z-10 `,
      windowSize.width < 1024 && (css`
        transform: translateX(${position}) ${scrollY > 100 && 'translateY(-8px)'};
      `),
      styles,
    ]),
    background: css([
      tw` bg-black-base/70 w-screen h-screen fixed top-0 left-0 z-[1] `,
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

        <Nav name='카테고리'>
          <Link href='/posts'><Icon icon='bxs:category' /> 전체 포스트 ({postsCount})</Link>
          {categories.map((category) => (
            <MenuItem
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
