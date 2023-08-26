import { Post, allPosts } from '@/.contentlayer/generated';

type MappedPosts = Partial<Post>;

export const getListMetadata = (start: number = 0, end: number = 0) => {
  const mappedPosts: MappedPosts[] = allPosts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    category: post.category,
    cover: post.cover,
    tags: post.tags,
    seriesName: post.seriesName,
    seriesOrder: post.seriesOrder,
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
