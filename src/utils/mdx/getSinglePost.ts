import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkCodeTitles from 'remark-code-titles';
import remarkSlug from 'remark-slug';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import { getPostContent } from './getPostContent';
import { getFrontMatter } from './getFrontMatter';

export const getSinglePost = async (postId: number) => {
  const frontMatter = getFrontMatter(postId);
  const { content, } = getPostContent(postId);

  const options: Options = {
    theme: 'github-dark',
  };

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkUnwrapImages,
        remarkCodeTitles,
        remarkSlug,
      ],
      rehypePlugins: [
        [ rehypePrettyCode, options, ],
      ],
    },
  });

  return {
    frontMatter,
    source: mdxSource,
  };
};
