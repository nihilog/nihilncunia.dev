import { allPosts } from 'contentlayer/generated';

export type ICustomPost = {
  id: number;
  title: string;
  description: string;
  category: string;
  cover: string;
  tags: string[];
  series: {
    name: string;
    order: number;
  };
  created: Date;
  updated: Date;
  published: boolean;
}

export const getListMetadata = (start: number = 0, end: number = 0) => {
  const mappedPosts = allPosts
    .filter((post) => post.published.includes('yes'))
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
      published: post.published === 'yes',
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
