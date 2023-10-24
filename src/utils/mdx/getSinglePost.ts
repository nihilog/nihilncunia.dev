import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkCodeTitles from 'remark-code-titles';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import { getListMetaData } from './getListMetaData';
import { getPostContent } from './getPostContent';

export const getSinglePost = async (postId: number) => {
  const postList = await getListMetaData();
  const frontMatter = postList.find((item) => item.id === postId);

  const { content, } = await getPostContent(postId);

  const options: Options = {
    theme: 'github-dark',
  };

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkUnwrapImages,
        remarkCodeTitles,
      ],
      rehypePlugins: [
      // [ rehypePrism, { showLineNumbers: true, }, ],
        [ rehypePrettyCode, options, ],
      ],
    },
  });

  return {
    frontMatter,
    source: mdxSource,
  };
};
