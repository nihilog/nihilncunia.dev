import { getListMetadata } from './getListMetadata';

type ISeries = {
  name: string;
  count: number;
};

export const getSeries = () => {
  const categories = getListMetadata()
    .filter((post) => post.series.name)
    .sort((a, b) => b.id - a.id)
    .map((post) => post.series.name);

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
