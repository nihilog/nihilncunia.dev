import React, {
  useEffect, useRef, useState
} from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Ul({ children, styles, }: Props) {
  const [ isFirst, setIsFirst, ] = useState(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ulRef.current && ulRef.current.parentElement.tagName === 'DIV') {
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }
  }, [ ulRef.current, ]);

  const style = {
    default: css([
      isFirst && tw` text-black-base border border-black-200 p-2 bg-black-50 dark:( bg-black-400 border-black-400 text-white ) `,
      !isFirst && tw` ml-5 `,
      styles,
    ]),
  };

  return (
    <>
      <ul
        ref={ulRef}
        css={style.default}
      >
        {children}
      </ul>
    </>
  );
}
