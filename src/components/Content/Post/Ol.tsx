import React, {
  useEffect, useRef, useState
} from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Ol({ children, styles, }: Props) {
  const [ isFirst, setIsFirst, ] = useState(null);
  const ulRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (ulRef.current && ulRef.current.parentElement.tagName === 'DIV') {
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }
  }, [ ulRef.current, ]);

  const style = {
    default: css([
      (css`
        counter-reset: number;

        & ol {
          counter-reset: number;
        }

        & li {
          &:is(.dark &):before {
            ${tw` bg-black-500 text-yellow-300 `}
          }

          &:before {

            content: counters(number, ".") ".";
            counter-increment: number;
            ${tw` text-[90%] bg-blue-200 rounded-1 inline-block px-2 text-blue-700 mr-2 `}
          }
        }
      `),
      isFirst && tw` text-black-base border border-black-200 p-2 bg-black-50 dark:( bg-black-600 border-black-400 text-white ) `,
      !isFirst && tw` ml-5 `,
      styles,
    ]),
  };

  return (
    <>
      <ol
        ref={ulRef}
        css={style.default}
      >
        {children}
      </ol>
    </>
  );
}
