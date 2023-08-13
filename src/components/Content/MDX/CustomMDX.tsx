import { MDXComponents } from 'mdx/types';
import { Footer } from '@/components/Layout';

/** 여기에 필요한 항목들을 넣는다. */
export const CustomMDX: MDXComponents = {
  Footer,
  pre: (props) => {
    console.log(props);

    return '';
  },
};
