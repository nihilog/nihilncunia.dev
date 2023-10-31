import { getListMetaData } from './getListMetaData';

export const getFrontMatter = (postId: number) => {
  const posts = getListMetaData();

  return posts.find((post) => post.id === postId);
};
