import React, { useEffect, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Ol } from './Ol';
import { Li } from './Li';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

interface Fns {
  n: number;
  content: string;
}

export function Fb({ styles, }: Props) {
  const [ fns, setFns, ] = useState<Fns[]>([]);

  useEffect(() => {
    const target = document.querySelectorAll('sup[data-n]');

    const fnArray: Fns[] = [];

    target.forEach((fn: HTMLElement) => {
      fnArray.push({
        n: +fn.dataset.n,
        content: fn.dataset.content,
      });
    });

    setFns(fnArray.sort((a, b) => a.n - b.n));
  }, []);

  const style = {
    default: css([
      tw` p-3 pb-0 pt-8 border-r border-l border-black-200 dark:border-black-400 bg-white dark:bg-black-500 `,
      styles,
    ]),
    divide: tw` mb-8 border-t-0 border-b-[5px] border-dotted border-black-400 dark:border-black-200 `,
    back: tw` inline-block align-middle ml-1 border-b border-transparent text-blue-500 dark:text-yellow-300 inline-flex items-baseline hover:( text-blue-700 dark:text-gold-600 border-blue-700 dark:border-gold-600 ) `,
  };

  return (
    <>
      {fns.length !== 0 && (
        <div css={style.default}>
          <hr css={style.divide} />
          <Ol>
            {fns.map((fn) => (
              <Li key={fn.n} styles={tw`flex items-start`}>
                <span id={`fb-${fn.n}`}>
                  {fn.content}
                  <Link href={`#fn-${fn.n}`} css={style.back}>
                    <Icon icon='typcn:arrow-back' />
                  </Link>
                </span>
              </Li>
            ))}
          </Ol>
        </div>
      )}
    </>
  );
}
