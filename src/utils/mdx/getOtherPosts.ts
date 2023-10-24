import { IFrontMatter } from '@/src/types/mdx.types';
import { getListMetaData } from './getListMetaData';

export const getOtherPosts = (category: string) => {
  const posts = getListMetaData().filter((post) => (
    post.category === category
  ));

  const length = posts.length >= 4 ? 4 : posts.length;

  const numbers = new Array(posts.length)
    .fill(0)
    .map((number, index) => number + index);

  const postIndexs = [];
  for (let i = 0; i < length; i++) {
    const number = Math.floor(Math.random() * numbers.length);

    if (postIndexs.includes(number)) {
      i--;
    } else {
      postIndexs.push(number);
    }
  }

  const selectedPosts: IFrontMatter[] = [];

  postIndexs.forEach((number) => {
    selectedPosts.push(posts[number]);
  });

  return selectedPosts;
};
