import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { codeBlockColor } from '@/src/data';

interface Props {
  title?: string;
  children?: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

// eslint-disable-next-line no-unused-vars
interface CodeBlock {
  props: {
    children: {
      props: {
        'data-language': string;
      }
    }
  };
}

export function CodeBlock({
  title, children, styles,
}: Props) {
  const language = (children as CodeBlock).props.children.props['data-language'].toUpperCase();
  const color = codeBlockColor[language];

  const style = {
    default: css([
      (css`
        & pre {
          border: 8px solid ${color.bgColor};
          border-top-width: 0;
        }
      `),
      styles,
    ]),
    codeTop: css([
      tw` flex items-center `,
      (css`
        color: ${color.color};
        background-color: ${color.bgColor};
      `),
    ]),
    title: css([
      tw` flex gap-1 items-center py-1 px-2 flex-1 shrink-0 `,
    ]),
    lang: css([
      tw` shrink-0 flex gap-1 items-center py-1 px-2 `,
    ]),
  };

  return (
    <>
      <div className='nihil-codeblock' css={style.default}>
        <div css={style.codeTop}>
          <div css={style.title}>
            {title && (
              <><Icon icon='bx:file' /> {title}</>
            )}
          </div>
          <div css={style.lang}>
            <Icon icon={color.icon} />
            {
              language === 'TS'
                ? 'TYPESCRIPT'
                : language === 'JS'
                  ? 'JAVASCRIPT'
                  : language
            }
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
