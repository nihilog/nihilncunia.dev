import {
  IsoDateTimeString, MDX, Series, allPosts
} from 'contentlayer/generated';

type DocumentContentType = 'markdown' | 'mdx' | 'data'

type RawDocumentData = {
  sourceFilePath: string;
  sourceFileName: string;
  sourceFileDir: string;
  contentType: DocumentContentType;
  flattenedPath: string;
}

export type ICustomPost = {
  _id: string;
  _raw: RawDocumentData;
  type: 'Post';
  id: number;
  title: string;
  description?: string | undefined;
  cover?: string | undefined;
  category?: string | undefined;
  tags: string[];
  series?: Series | undefined;
  created: IsoDateTimeString;
  updated: IsoDateTimeString;
  body: MDX;
  published: boolean;
};

export const getListMetadata = (start: number = 0, end: number = 0) => {
  const mappedPosts = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      category: post.category,
      cover: post.cover,
      tags: post.tags,
      series: {
        ...post.series,
        name: post.series.name,
        order: post.series.order,
      },
      created: post.created,
      updated: post.updated,
      published: post.published,
    }) as unknown as ICustomPost)
    .sort((a, b) => {
      return b.id - a.id;
    });

  if ((!start || !end) || (!start && !end)) {
    return mappedPosts;
  } else {
    return mappedPosts.slice(start, end);
  }
};
