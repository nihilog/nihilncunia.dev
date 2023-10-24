import { IPostContent } from '@/src/types/mdx.types';
import postContents from '@/data/postContent.json';

export const getPostContent = (postId: number) => {
  const postContent = (postContents as IPostContent[])
    .find((post) => post.id === postId) as IPostContent;

  return postContent;
};
