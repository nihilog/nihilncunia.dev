import React from 'react';
import tw, { css } from 'twin.macro';
import { Icon } from '@iconify/react';
import { AppLayout } from '@/src/layouts';
import { A, H, P } from '../components/Base';

export default function AboutPage() {
  const style = {
    box: css([
      tw` border border-black-200 bg-white text-black-base p-3 space-y-8 `,
      tw` dark:( border-black-400 bg-black-500 text-white ) `,
      tw` [p]:( text-justify break-all ) `,
    ]),
    heading: css([
      tw` p-3 bg-black-base text-white dark:( bg-black-600 text-yellow-300 ) mb-2 shadow-md [span]:( flex items-center gap-2 font-black ) `,
    ]),
  };

  return (
    <>
      <AppLayout title='소개'>
        <div>
          <H type='normal' styles={style.heading}>
            <Icon icon='ant-design:message-filled' /> 소개
          </H>
          <div css={style.box}>
            <p>이 블로그의 주인장은 웹 개발자가 되고 싶은 웹 개발자입니다. 혼자서 공부해온 것은 많지만 그럼에도 아직 배울 게 산더미인 작디 작은 웹 개발자. 이 블로그는 아무리 허접이어도 명색이 개발자인데 스스로 구축한 블로그는 있어야하지 않을까 싶어서 만들게 되었습니다.</p>
            <p>이 블로그는 앞으로 하게 되는 공부들이나 혹은 지금까지 배운 것들을 정리하기 위해서 사용될 예정입니다. 혹은 간간히 진행하는 작은 토이 프로젝트에 대한 기록도 할 수 있을지도 모르겠습니다. 중요한 것은 계속 이 블로그를 사용하면서 웹 개발자가 되고 싶은 꿈을 이루기 위해 노력할 것이라는 것입니다.</p>
          </div>
        </div>

        <div>
          <H type='normal' styles={style.heading}>
            <Icon icon='ant-design:message-filled' /> 적용된 기술스택
          </H>
          <div css={style.box}>
            <P><strong>NextJS & Contentlayer</strong><br />리액트의 프레임워크인 <A href='https://nextjs.org/' external>NextJS</A>로 페이지 라우팅과 기본적인 프론트엔드 작업을 진행했습니다. 이런 블로그의 특성상 MDX를 사용할 수 밖에 없는데 다양한 선택지 중에 <A href='https://contentlayer.dev/' external>Contentlayer</A>를 선택했습니다. 간편하게 문서를 관리할 수 있어서 상당히 편리했습니다.</P>

            <P><strong>Emotion & TailwindCSS</strong><br />스타일링은 두가지를 합쳐서 사용했습니다. 스타일드 컴포넌트같은 문법을 갖고 있는 <A href='https://emotion.sh/docs/introduction' external>Emotion</A>과 편리하게 스타일링을 할 수 있는 <A href='https://tailwindcss.com/' external>TailwindCSS</A>인데 이 두가지는 <A href='https://github.com/ben-rogerson/twin.macro' external>twin.macro</A>를 통해서 조합이 가능합니다. 이렇게 조합을 해서 편리하고 더 강력하게 스타일링을 할 수 있었습니다. 디자인에 조예가 있는 편은 아니라 훌륭하지는 못합니다.</P>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
