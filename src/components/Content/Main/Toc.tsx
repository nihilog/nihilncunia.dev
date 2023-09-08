import React, { useEffect } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Ol } from '../Post';
import { H } from '../../Base';
import { Level1, setToc } from '@/src/reducers/dark.reducer';
import { useAppDispatch, useAppSelector } from '@/src/hooks/rtk';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Toc({ styles, }: Props) {
  const toc = useAppSelector(
    (state) => state.dark.toc
  );
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    const tocArray: Level1[] = [];
    let headings = [ ...document.querySelectorAll('div.mdx-post .mdx-heading'), ];

    headings = headings
      .filter((item) => item.textContent !== '목차')
      .filter((item) => item.textContent !== '이런 포스트도 있어요');

    let level1 = 1;
    let level2 = 1;
    let level3 = 1;
    let level4 = 1;
    let level5 = 1;

    headings.forEach((item) => {
      if (item.tagName === 'H2') {
        tocArray.push({
          no: level1++,
          content: item.textContent,
          child: [],
        });
      } else if (item.tagName === 'H3') {
        const h2Item = tocArray.find((h2) => h2.no === level1 - 1);

        h2Item?.child.push({
          no: level2++,
          parentNo: `${h2Item.no}.`,
          content: item.textContent,
          child: [],
        });
      } else if (item.tagName === 'H4') {
        const h2Item = tocArray.find((h2) => h2.no === level1 - 1);
        const h3Item = h2Item.child.find((h3) => h3.no === level2 - 1);

        h3Item?.child.push({
          no: level3++,
          parentNo: `${h2Item.no}.${h3Item.no}.`,
          content: item.textContent,
          child: [],
        });
      } else if (item.tagName === 'H5') {
        const h2Item = tocArray.find((h2) => h2.no === level1 - 1);
        const h3Item = h2Item.child.find((h3) => h3.no === level2 - 1);
        const h4Item = h3Item.child.find((h4) => h4.no === level3 - 1);

        h4Item?.child.push({
          no: level4++,
          parentNo: `${h2Item.no}.${h3Item.no}.${h4Item.no}.`,
          content: item.textContent,
          child: [],
        });
      } else if (item.tagName === 'H6') {
        const h2Item = tocArray.find((h2) => h2.no === level1 - 1);
        const h3Item = h2Item.child.find((h3) => h3.no === level2 - 1);
        const h4Item = h3Item.child.find((h4) => h4.no === level3 - 1);
        const h5Item = h4Item.child.find((h4) => h4.no === level4 - 1);

        h5Item?.child.push({
          no: level5++,
          parentNo: `${h2Item.no}.${h3Item.no}.${h4Item.no}.${h5Item.no}.`,
          content: item.textContent,
        });
      }
    });

    dispatch(setToc({ value: tocArray, }));
  }, [ router.asPath, ]);

  console.log(toc);

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
    link: css([
      tw` inline-flex flex-row gap-1 items-center `,
      tw` [a]:( text-black-300 hover:text-blue-600 transition-colors duration-200 ) dark:( [a:hover]:( text-yellow-300 ) ) `,
    ]),
  };

  return (
    <>
      <H type='post'>목차</H>
      <Ol>
        {toc?.map((level1) => (
          <li key={uuid()}>
            <span css={style.link} id={`toc-${level1.no}`}>
              {level1.content}
              <Link href={`#heading-${level1.no}`}>
                <Icon icon='mingcute:link-fill' />
              </Link>
            </span>
            <Ol>
              {level1.child.map((level2) => (
                <li key={uuid()}>
                  <span css={style.link} id={`toc-${level2.parentNo}${level2.no}`}>
                    {level2.content}
                    <Link href={`#heading-${level2.parentNo}${level2.no}`}>
                      <Icon icon='mingcute:link-fill' />
                    </Link>
                  </span>
                  <Ol>
                    {level2.child.map((level3) => (
                      <li key={uuid()}>
                        <span css={style.link} id={`toc-${level3.parentNo}${level3.no}`}>
                          {level3.content}
                          <Link href={`#heading-${level3.parentNo}${level3.no}`}>
                            <Icon icon='mingcute:link-fill' />
                          </Link>
                        </span>
                        <Ol>
                          {level3.child.map((level4) => (
                            <li key={uuid()}>
                              <span css={style.link} id={`toc-${level4.parentNo}${level4.no}`}>
                                {level4.content}
                                <Link href={`#heading-${level4.parentNo}${level4.no}`}>
                                  <Icon icon='mingcute:link-fill' />
                                </Link>
                              </span>
                              <Ol>
                                {level4.child.map((level5) => (
                                  <li key={uuid()}>
                                    <span
                                      css={style.link}
                                      id={`toc-${level5.parentNo}${level5.no}`}
                                    >
                                      {level5.content}
                                      <Link href={`#heading-${level5.parentNo}${level5.no}`}>
                                        <Icon icon='mingcute:link-fill' />
                                      </Link>
                                    </span>
                                  </li>
                                ))}
                              </Ol>
                            </li>
                          ))}
                        </Ol>
                      </li>
                    ))}
                  </Ol>
                </li>
              ))}
            </Ol>
          </li>
        ))}
      </Ol>
    </>
  );
}
