import { IConfigData } from '@/types/site.types';

export const configData: IConfigData = {
  title: '사이트 이름',
  description: '',
  keywords: '',
  author: 'NIHILncunia',
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : '',
  image: '',
  postPerPage: 10,
  version: 'v0.0.0',
};
