import { getListMetadata } from './getListMetadata';

export const getPageArray = () => {
  const totalPage = Math.ceil(getListMetadata().length / 5);

  let pageArray = new Array(totalPage)
    .fill(0)
    .map((item: number, index) => item + index);

  let pageArray2 = new Array(Math.ceil(pageArray.length / 5))
    .fill(0)
    .map(() => pageArray.splice(0, 5));

  return {
    totalPage,
    pages: pageArray2,
  };
};
