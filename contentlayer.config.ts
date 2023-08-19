import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypePrism from 'rehype-prism-plus';
import remarkCodeTitles from 'remark-code-titles';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: '**/*.mdx',
  fields: {
    id: { type: 'number', required: true, },
    title: { type: 'string', required: true, },
    description: { type: 'string', required: false, },
    cover: { type: 'string', required: false, },
    category: { type: 'string', required: false, },
    tags: { type: 'list', of: { type: 'string', }, required: true, },
    seriesName: { type: 'string', required: false, },
    seriesOrder: { type: 'number', required: false, },
    created: { type: 'date', required: true, },
    updated: { type: 'date', required: true, },
    published: { type: 'string', required: false, default: 'yes', },
  },
}));

const options: Options = {
  theme: 'github-dark',
};

export default makeSource({
  contentDirPath: 'posts',
  contentDirInclude: [ '2023', '2024', '2025', ],
  documentTypes: [ Post, ],
  mdx: {
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
