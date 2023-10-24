import { IFrontMatter } from '@/src/types/mdx.types';
import posts from '@/data/postFrontMatter.json';

export const getListMetaData = (start: number = 0, end: number = 0) => {
  // const posts: IFrontMatter[] = JSON.parse(fileData);

  if ((!start || !end) || (!start && !end)) {
    return posts as IFrontMatter[];
  } else {
    return posts.slice(start, end) as IFrontMatter[];
  }
};
