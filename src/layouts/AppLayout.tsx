import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Footer, Header, Main, Meta
} from '@/src/components/Layout';
import { IAppLayoutProps, IMetaData } from '@/src/types/site.types';
import { useAppDispatch } from '../hooks/rtk';
import { setHeaderHeight } from '../reducers/dark.reducer';
import { useReSize, useScroll } from '../hooks';

export function AppLayout({
  children, title, description, keywords, author, image, created, updated, tags, type, section,
}: IAppLayoutProps) {
  const router = useRouter();
  const size = useReSize();
  const scroll = useScroll();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const header = document.querySelector('header#app-header');

      dispatch(setHeaderHeight({
        value: header.clientHeight,
      }));
    }
  }, [ size.width, scroll.y, ]);

  const meta: IMetaData = {
    title,
    url: router.asPath,
    description,
    keywords,
    author,
    image,
    tags,
    type,
    section,
    created,
    updated,
  };

  return (
    <>
      <Meta meta={meta} />

      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
