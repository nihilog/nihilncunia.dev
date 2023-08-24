import { IConfigData } from '@/src/types/site.types';
import { setCover } from '@/src/utils';

export const configData: IConfigData = {
  title: '니힐로그 시즌3',
  description: '이 블로그는 개발 공부, 개인 프로젝트 소개 등등의 목적으로 만들어진 블로그입니다.',
  keywords: 'coding,programming,web,development',
  author: 'NIHILncunia',
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://nihilog-dev.github.io/',
  image: setCover('https://drive.google.com/file/d/1nQEoPotztnvzB75XkK_XaTsauFwNBlYo/view?usp=drive_link'),
  postPerPage: 5,
  version: 'v0.0.0',
};
