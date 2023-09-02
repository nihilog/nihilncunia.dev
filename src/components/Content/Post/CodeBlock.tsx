import React, { useCallback, useMemo, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';
import { codeBlockColor } from '@/src/data';

interface Props {
  title?: string;
  children?: React.ReactNode;
  fold?: boolean;
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
  title, children, fold = false, styles,
}: Props) {
  const [ isFold, setIsFold, ] = useState(fold);

  const lang = useMemo(() => {
    const findLang = (children as CodeBlock).props.children.props['data-language'].toUpperCase();
    let result: string;

    if (findLang === 'TS') {
      result = 'TYPESCRIPT';
    } else if (findLang === 'JS') {
      result = 'JAVASCRIPT';
    } else if ((findLang === 'JSX') || (findLang === 'TSX')) {
      result = 'REACT';
    } else {
      result = findLang;
    }

    return result;
  }, []);

  const color = codeBlockColor[lang];

  const onClickOpen = useCallback(
    () => {
      setIsFold((prev) => !prev);
    },
    []
  );

  const style = {
    default: css([
      (css`
        & pre {
          border: 8px solid ${color.bgColor};
          border-top-width: 0;
        }
      `),
      lang === 'BASH' && tw` border border-black-400 `,
      styles,
    ]),
    codeTop: css([
      tw` flex items-center pl-2 `,
      (css`
        color: ${color.color};
        background-color: ${color.bgColor};

        button {
          padding: 4px;
          background-color: ${color.color}80;
          color: ${color.bgColor};
          border-radius: 4px;
          transition: background-color .3s;

          &:hover {
            background-color: ${color.color};
          }
        }
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
          <button onClick={onClickOpen}>
            {isFold ? (
              <Icon icon='ep:arrow-down-bold' />
            ) : (
              <Icon icon='ep:arrow-up-bold' />
            )}
          </button>
          <div css={style.title}>
            {title && (
              <><Icon icon='bx:file' /> {title}</>
            )}
          </div>
          <div css={style.lang}>
            <Icon icon={color.icon} />
            {lang}
          </div>
        </div>
        {!isFold && children}
      </div>
    </>
  );
}
