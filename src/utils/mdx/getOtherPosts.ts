import { Post } from '@/.contentlayer/generated';
import { getListMetadata } from './getListMetadata';

export const getOtherPosts = (category: string) => {
  const posts = getListMetadata().filter((post) => (
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

  console.log(postIndexs.length);

  const selectedPosts: Partial<Post>[] = [];

  postIndexs.forEach((number) => {
    selectedPosts.push(posts[number]);
  });

  console.log(selectedPosts);

  return selectedPosts;
};
