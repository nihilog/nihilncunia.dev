import React from 'react';
import { useRouter } from 'next/router';
import {
  Footer, Header, Main, Meta
} from '@/src/components/Layout';
import { IAppLayoutProps, IMetaData } from '@/src/types/site.types';

export function AppLayout({
  children, title, description, keywords, author, image, created, updated, tags, type, section,
}: IAppLayoutProps) {
  const router = useRouter();

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
