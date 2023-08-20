import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import tw, { css } from 'twin.macro';

interface Props {
  href: string;
  category: string;
  count: number;
  icon: string;
}

export function CategoryItem({
  href, category, count, icon,
}: Props) {
  const [ selected, setSelected, ] = useState('');
  const [ linkIcon, setLinkIcon, ] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.category === category) {
      setSelected('selected');
      setLinkIcon('material-symbols:folder-open');
    } else {
      setSelected('');
      setLinkIcon(icon);
    }
  }, [ category, router.query, icon, ]);

  const style = {
    default: css([
      router.query.category === category && tw` bg-blue-500! border-blue-500! text-white! hover:( [span]:( bg-white! text-blue-500! ) ) `,
    ]),
    count: css([
      tw` text-[90%] inline-flex items-center justify-center py-1 px-2 ml-1 bg-black-300 text-white leading-[1] rounded-2 `,
      router.query.category === category && tw` bg-white text-blue-600 font-500 `,
    ]),
  };

  return (
    <Link href={href} data-category={category} className={selected} css={style.default}>
      <Icon icon={linkIcon} /> {category} <span css={style.count}>{count}</span>
    </Link>
  );
}
