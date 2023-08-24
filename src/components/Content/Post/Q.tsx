import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { A } from '@/src/components/Base';

interface Props {
  cite?: string;
  who?: string;
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Q({
  cite, who, children, styles,
}: Props) {
  const style = {
    default: css([
      tw` p-2 bg-black-50 border border-black-200 inline-block text-center text-black-base dark:( bg-black-600 border-black-400 text-white ) `,
      styles,
    ]),
    who: css([
      tw` flex gap-1 items-center `,
      cite && tw` pr-3 mr-3 border-r-[5px] border-black-200 `,
    ]),
    body: css([
      tw` inline-block [p]:text-center `,
    ]),
    bottom: (who || cite) && tw` mt-3 pt-3 border-t-[5px] border-black-200 border-dashed flex justify-end `,
  };

  return (
    <>
      <blockquote css={style.default}>
        <Icon
          icon='fa-solid:quote-left'
          tw='text-black-base dark:text-white mb-2'
        />

        <div css={style.body}>
          {children}
        </div>

        <Icon
          icon='fa-solid:quote-right'
          tw='text-black-base dark:text-white ml-auto mt-2'
        />

        <div css={style.bottom}>
          {who && (
            <div css={style.who}>
              <Icon icon='bxs:user' /> {who}
            </div>
          )}
          {cite && (
            <A href={cite} external>[출처]</A>
          )}
        </div>
      </blockquote>
      <div tw='mt-0!' />
    </>
  );
}
