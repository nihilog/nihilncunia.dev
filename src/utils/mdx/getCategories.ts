import { getListMetadata } from './getListMetadata';

type ICategories = {
  name: string;
  count: number;
};

export const getCategories = () => {
  const categories = getListMetadata()
    .filter((post) => post.category)
    .sort((a, b) => b.id - a.id)
    .map((post) => post.category);

  const categoriesObj = categories.reduce((pre: ICategories[], curr) => {
    const findItem = pre.find((item) => item.name === curr);

    if (findItem) {
      findItem.count++;
    } else {
      pre.push({ name: curr, count: 1, });
    }

    return pre;
  }, []);

  const noneCategories = getListMetadata()
    .filter((post) => post.category === '');

  categoriesObj.unshift({
    name: '없음',
    count: noneCategories.length,
  });

  return categoriesObj;
};
