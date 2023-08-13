import { allPosts } from '@contentlayer';

type ICategories = {
  name: string;
  count: number;
};

export const getCategories = () => {
  const categories = allPosts.map((post) => post.category);

  return categories.reduce((pre: ICategories[], curr) => {
    const findItem = pre.find((item) => item.name === curr);

    if (findItem) {
      findItem.count++;
    } else {
      pre.push({ name: curr, count: 1, });
    }

    return pre;
  }, []);
};
