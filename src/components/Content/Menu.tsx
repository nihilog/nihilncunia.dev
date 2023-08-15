import React from 'react';
import tw, { TwStyle, css, theme } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { allPosts } from '@contentlayer';
import { Icon } from '@iconify/react';
import { getCategories } from '@/utils/mdx';
import { linksData } from '@/data';
import { MenuItem } from './MenuItem';

interface Props {
  align: ('horizontal' | 'vertical');
  styles?: TwStyle | SerializedStyles;
}

export function Menu({ align, styles, }: Props) {
  const postsCount = allPosts.length;
  const categories = getCategories();

  const style = {
    default: css([
      tw` flex `,
      tw` [a]:(
        transition-all duration-200 text-black-base font-500 shrink-0 flex items-center gap-1
        hover:( text-blue-600 )
      ) `,
      (css`
        & > a.selected {
          color: ${theme('colors.blue.600')};
        }
      `),
      align === 'horizontal' && tw`
        flex-row flex-nowrap overflow-x-auto pb-4 gap-2
        [a]:(
          bg-white border border-black-200 rounded-1 py-1 px-2 text-black-base
          hover:( bg-blue-600 border-blue-600 text-white )
        )
      `,
      align === 'vertical' && tw` flex-col w-[250px] gap-2 `,
      styles,
    ]),
    line: css([
      align === 'vertical' && tw` border-b-[5px] border-black-300 border-dotted my-4 `,
      align === 'horizontal' && tw` w-[5px] bg-black-300 mx-4 shrink-0 `,
    ]),
  };

  return (
    <>
      <nav css={style.default}>
        {linksData.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            as={link.as}
          >
            <Icon icon={link.icon} /> {link.label}
          </Link>
        ))}

        <span css={style.line} />

        <Link href='/posts'>전체 포스트 ({postsCount})</Link>

        {categories.map((category) => (
          <MenuItem
            key={category.name}
            href={`/categories/${category.name}`}
            category={category.name}
            icon='material-symbols:folder'
            count={category.count}
          />
        ))}
      </nav>
    </>
  );
}
