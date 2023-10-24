import {
  mkdir, readFileSync, readdirSync, writeFileSync
} from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { IFrontMatter, IPostContent } from '@/src/types/mdx.types';
import { dateFormat } from '../date';

export const createPosts = () => {
  const startYear = 2021;
  const endYear = new Date().getFullYear();

  const yearArray = new Array(1 + (endYear - startYear))
    .fill(startYear)
    .map((year: number, index) => (year + index).toString());

  const frontMatterArray: IFrontMatter[] = [];
  const contentArray: IPostContent[] = [];

  yearArray.forEach((year) => {
    const folderPath = join(process.cwd(), 'posts', String(year));
    const postPaths = readdirSync(folderPath).filter(
      (post) => /\.mdx?$/.test(post)
    );

    postPaths.forEach((post) => {
      const source = readFileSync(join(folderPath, post), 'utf8');
      const { data, content, } = matter(source);
      const newData = { ...data, } as IFrontMatter;

      const frontMatter: IFrontMatter = {
        ...newData,
        created: dateFormat(newData.created, 'YYYY-MM-DD HH:mm'),
        updated: dateFormat(newData.updated, 'YYYY-MM-DD HH:mm'),
      };

      frontMatterArray.push(frontMatter);
      contentArray.push({
        id: frontMatter.id,
        content,
      });
    });
  });

  const postFrontMatter = frontMatterArray
    .filter((data) => data.published)
    .sort((a, b) => {
      const aTime = new Date(a.created).getTime();
      const bTime = new Date(b.created).getTime();

      return bTime - aTime;
    });

  const topPath = readdirSync(join(process.cwd()));

  if (!topPath.includes('data')) {
    console.log('폴더를 생성합니다.');

    mkdir(join(process.cwd(), 'data'), (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('폴더가 생성되었습니다.');
      }
    });
  } else {
    console.log('이미 폴더가 있습니다.');
  }

  writeFileSync(
    join(process.cwd(), 'data', 'postFrontMatter.json'),
    JSON.stringify(postFrontMatter),
    {
      encoding: 'utf-8',
    }
  );

  writeFileSync(
    join(process.cwd(), 'data', 'postContent.json'),
    JSON.stringify(contentArray),
    {
      encoding: 'utf-8',
    }
  );
};
