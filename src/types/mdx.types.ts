import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type IFrontMatter = {
  id: number;
  title: string;
  description: string;
  cover: string;
  category: string;
  tags: string[];
  series: {
    name: string;
    order: number;
  };
  published: boolean;
  created: string;
  updated: string;
};

export type IPostContent = {
  id: number;
  content: string;
};

export type IPost = {
  frontMatter: IFrontMatter;
  source: MDXRemoteSerializeResult;
};
