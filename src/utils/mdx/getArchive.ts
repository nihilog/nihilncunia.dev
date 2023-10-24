import { getListMetaData } from './getListMetaData';

export type IArchive = {
  name: string;
  count: number;
};

export const getArchive = () => {
  const postList = getListMetaData();
  const createdArray = postList.map((post) => {
    return post.created.match(/(\d{4})-(\d{2})/g)[0];
  });

  return createdArray.reduce((pre: IArchive[], curr) => {
    const findItem = pre.find((item) => item.name === curr);

    if (findItem) {
      findItem.count++;
    } else {
      pre.push({
        name: curr,
        count: 1,
      });
    }

    return pre;
  }, []);
};
