import { allPosts } from 'contentlayer/generated';

export type ITags = {
  name: string;
  count: number;
};

export const getTags = () => {
  const tagsArray = allPosts.map((post) => (post.tags));
  let tags: string[] = [];

  tagsArray.forEach((tag) => {
    tags = tags.concat(tag);
  });

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
