import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

interface Props {
  href: string;
  category: string;
  count: number;
  icon: string;
}

export function MenuItem({
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

  return (
    <Link href={href} data-category={category} className={selected}>
      <Icon icon={linkIcon} /> {category} ({count})
    </Link>
  );
}
