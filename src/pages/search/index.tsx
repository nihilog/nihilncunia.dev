import React from 'react';
import { AppLayout } from '@/src/layouts';
import { PostList } from '@/src/components/Content/Main';
import { useAppSelector } from '@/src/hooks/rtk';

export default function SearchPage() {
  const { keyword, posts, } = useAppSelector(
    (state) => state.dark
  );

  console.log('posts >> ', posts);

  return (
    <>
      <AppLayout title={`"${keyword}" 검색 결과`}>
        <PostList posts={posts} listName={`"${keyword}" 검색 결과 총 ${posts.length}건`} />
      </AppLayout>
    </>
  );
}
