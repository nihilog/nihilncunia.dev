import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { useReSize } from '@/src/hooks';

interface Props {
  name: string;
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Nav({ name, children, styles, }: Props) {
  const windowSize = useReSize();

  const style = {
    default: css([
      tw` w-full flex flex-col gap-2 [span]:( transition-all duration-200 ) `,
      windowSize.width < 1024 && tw` shadow-none `,
      (css`
        a {
          ${tw`p-2 flex flex-row items-center gap-1 bg-white border border-black-200 transition-all duration-200 text-black-base shadow-md dark:( bg-black-500 border-black-400 text-white ) `};

          &:hover {
            ${tw`text-blue-600 border-blue-500 bg-blue-100 dark:( border-yellow-300 text-yellow-300 bg-black-600 )`};

            & span {
              ${tw`bg-blue-600 text-white dark:( text-black-base bg-yellow-300 ) `};
            }
          }
        }
      `),
      styles,
    ]),
    name: css([
      tw` flex items-center gap-1 p-2 bg-black-base text-white dark:( bg-black-600 text-yellow-300 ) font-black shadow-md mb-2 `,
    ]),
  };

  return (
    <div>
      <h2 css={style.name}><Icon icon='eva:arrow-right-fill' /> {name}</h2>
      <nav css={style.default}>
        {children}
      </nav>
    </div>
  );
}
