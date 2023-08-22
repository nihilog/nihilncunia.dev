import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

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
      tw` p-2 bg-black-50 border border-black-200 inline-block text-black-base `,
      styles,
    ]),
    who: css([
      tw` flex gap-1 items-center `,
      cite && tw` pr-3 mr-3 border-r-2 border-black-300 `,
    ]),
    cite: css([
      tw` text-green-600 hover:underline hover:text-green-700 `,
    ]),
    body: css([
      tw` inline-block [p]:text-center `,
    ]),
    bottom: (who || cite) && tw` mt-3 pt-3 border-t-[5px] border-black-200 border-dashed flex justify-end `,
  };

  return (
    <>
      <blockquote css={style.default}>
        <div css={style.body}>
          <Icon
            icon='fa-solid:quote-left'
            tw='text-black-base mb-2'
          />
          {children}
          <Icon
            icon='fa-solid:quote-right'
            tw='text-black-base ml-auto mt-2'
          />
        </div>
        <div css={style.bottom}>
          {who && (
            <div css={style.who}>
              <Icon icon='bxs:user' /> {who}
            </div>
          )}
          {cite && (
            <a
              href={cite}
              target='_blank'
              rel='noreferrer noopener'
              css={style.cite}
            >
              [출처]
            </a>
          )}
        </div>
      </blockquote>
      <div tw='mt-0!' />
    </>
  );
}
