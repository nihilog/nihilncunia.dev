import { Post, allPosts } from '@/.contentlayer/generated';

interface MappedPosts extends Partial<Post> {}

export const getListMetadata = (start: number = 0, end: number = 0) => {
  const mappedPosts: MappedPosts[] = allPosts
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
      published: post.published,
    }))
    .sort((a, b) => {
      return b.id - a.id;
    });

  if ((!start || !end) || (!start && !end)) {
    return mappedPosts;
  } else {
    return mappedPosts.slice(start, end);
  }
};
