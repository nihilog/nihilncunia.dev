import { allPosts } from 'contentlayer/generated';

type ISeries = {
  name: string;
  count: number;
};

export const getSeries = () => {
  const categories = allPosts
    .filter((post) => post.seriesName)
    .sort((a, b) => b.id - a.id)
    .map((post) => post.seriesName);

  return categories.reduce((pre: ISeries[], curr) => {
    const findItem = pre.find((item) => item.name === curr);

    if (findItem) {
      findItem.count++;
    } else {
      pre.push({ name: curr, count: 1, });
    }

    return pre;
  }, []);
};
