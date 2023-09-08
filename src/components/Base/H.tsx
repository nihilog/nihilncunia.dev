import React, { useEffect, useRef, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useAppSelector } from '@/src/hooks/rtk';

interface Props {
  level?: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');
  type?: ('post' | 'normal' | 'postlist');
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function H({
  level: Heading = 'h2', type = 'normal', children, styles,
}: Props) {
  const [ link, setLink, ] = useState('');
  const toc = useAppSelector(
    (state) => state.dark.toc
  );

  const hRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (Heading === 'h2') {
      const lv1 = toc.find((item) => (
        item.content === hRef.current.textContent
      ));

      setLink(`${lv1?.no}`);
    } else if (Heading === 'h3') {
      const lv1 = toc.filter((item) => item.child.length > 0);
      lv1.forEach((item) => {
        const lv2 = item.child.find((item) => (
          item.content === hRef.current.textContent
        ));

        setLink(`${lv2?.parentNo}${lv2?.no}`);
      });
    } else if (Heading === 'h4') {
      const lv1 = toc.filter((item) => item.child.length > 0);
      lv1.forEach((lv1) => {
        const lv2 = lv1.child.filter((item) => item.child.length > 0);
        lv2.forEach((lv2) => {
          const lv3 = lv2.child.find((item) => (
            item.content === hRef.current.textContent
          ));

          setLink(`${lv3?.parentNo}${lv3?.no}`);
        });
      });
    } else if (Heading === 'h5') {
      const lv1 = toc.filter((item) => item.child.length > 0);
      lv1.forEach((lv1) => {
        const lv2 = lv1.child.filter((item) => item.child.length > 0);
        lv2.forEach((lv2) => {
          const lv3 = lv2.child.filter((item) => item.child.length > 0);
          lv3.forEach((lv3) => {
            const lv4 = lv3.child.find((item) => (
              item.content === hRef.current.textContent
            ));

            setLink(`${lv4?.parentNo}${lv4?.no}`);
          });
        });
      });
    } else if (Heading === 'h6') {
      const lv1 = toc.filter((item) => item.child.length > 0);
      lv1.forEach((lv1) => {
        const lv2 = lv1.child.filter((item) => item.child.length > 0);
        lv2.forEach((lv2) => {
          const lv3 = lv2.child.filter((item) => item.child.length > 0);
          lv3.forEach((lv3) => {
            const lv4 = lv3.child.filter((item) => item.child.length > 0);
            lv4.forEach((lv4) => {
              const lv5 = lv4.child.find((item) => (
                item.content === hRef.current.textContent
              ));

              setLink(`${lv5?.parentNo}${lv5?.no}`);
            });
          });
        });
      });
    }
  }, [ toc, hRef.current, ]);

  const size = {
    h1: tw` text-h1 `,
    h2: tw` text-h2 `,
    h3: tw` text-h3 `,
    h4: tw` text-h4 `,
    h5: tw` text-h5 `,
    h6: tw` text-h6 font-700 `,
  };

  const style = {
    default: css([
      tw` leading-[1.2] text-black-base dark:text-white [span]:( flex items-center gap-2 text-[70%] mf-sm:text-[80%] mf-md:text-[90%] mf-lg:text-[100%] font-black ) `,
      type === 'post' && tw` font-black p-2 px-3 border-l-[12px] border-blue-600 dark:border-yellow-300 `,
      type === 'normal' && tw` font-black `,
      type === 'postlist' && [
        tw` [a]:( text-justify break-all p-2 border border-blue-200 bg-blue-100 flex items-center justify-start text-[60%] mf-sm:text-[70%] text-blue-600 transition-all duration-200 flex-1 shrink-0 ) `,
        tw` [a:hover]:( bg-blue-500 text-white border-blue-500 ) `,
        tw` dark:( [a]:( border-yellow-300/30 text-yellow-300 bg-black-600 hover:( bg-yellow-300 text-black-base ) ) ) `,
      ],
      size[Heading],
      styles,
    ]),
  };

  return (
    <>
      <Heading css={style.default} className='mdx-heading' id={`heading-${link}`} ref={hRef}>
        <span>
          {children}
          {type === 'post'
            && (hRef.current?.textContent !== '목차')
            && (hRef.current?.textContent !== '이런 포스트도 있어요')
            && (
              <Link href={`#toc-${link}`} tw='text-black-300 hover:text-blue-600 dark:hover:text-yellow-300 transition-colors duration-200'>
                <Icon icon='mingcute:link-fill' />
              </Link>
            )}
        </span>
      </Heading>
    </>
  );
}
