import { allPosts } from '@contentlayer';

type ITags = {
  name: string;
  count: number;
};

export const getTags = () => {
  const tags = [ ...new Set(...allPosts.map((post) => post.tags)), ];

  return tags.reduce((pre: ITags[], curr) => {
    const findItem = pre.find((item) => item.name === curr);

    if (findItem) {
      findItem.count++;
    } else {
      pre.push({ name: curr, count: 1, });
    }

    return pre;
  }, []);
};
