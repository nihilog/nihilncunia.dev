import React from 'react';
import { configData } from '@/data';
import { A, Message } from '@/components/Base';

export function Welcome() {
  return (
    <>
      <Message color='b'>
        <p>{configData.title}에 방문하신 것을 환영합니다. 이 블로그는 개발 공부, 개인 프로젝트 소개 등을 목적으로 만든 블로그입니다. 저에 대해 궁금하시면 <A href='/about'>소개</A>링크를 참고해주세요.</p>
      </Message>
    </>
  );
}
