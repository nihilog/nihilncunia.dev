import { getListMetadata } from './getListMetadata';

export type IArchive = {
  name: string;
  count: number;
};

export const getArchive = () => {
  const createdArray = getListMetadata().map((post) => {
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
