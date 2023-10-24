import { getListMetaData } from './getListMetaData';

type ICategories = {
  name: string;
  count: number;
};

export const getCategories = () => {
  const postList = getListMetaData();
  const categories = postList
    .filter((post) => post.category)
    .filter((post) => post.category !== '공지사항')
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

  const noneCategories = postList
    .filter((post) => post.category === '');

  categoriesObj.unshift({
    name: '분류없음',
    count: noneCategories.length,
  });

  const notices = postList
    .filter((post) => post.category === '공지사항');

  categoriesObj.unshift({
    name: '공지사항',
    count: notices.length,
  });

  return categoriesObj;
};
