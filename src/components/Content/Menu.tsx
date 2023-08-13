import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { allPosts } from '@contentlayer';
import { getCategories } from '@/utils/mdx';
import { linksData } from '@/data';

interface Props {
  align: ('horizontal' | 'vertical');
  styles?: TwStyle | SerializedStyles;
}

export function Menu({ align, styles, }: Props) {
  const postsCount = allPosts.length;
  const categories = getCategories();

  const style = {
    default: css([
      tw` flex gap-1 `,
      align === 'horizontal' && tw` flex-row `,
      align === 'vertical' && tw` flex-col `,
      styles,
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
            {link.label}
          </Link>
        ))}

        <Link href='/posts'>전체 포스트 ({postsCount}건)</Link>

        {categories.map((category) => (
          <Link key={category.name} href={`/categories/${category.name}`}>
            {category.name} ({category.count}건)
          </Link>
        ))}
      </nav>
    </>
  );
}
