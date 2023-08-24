import React, {
  useEffect, useMemo, useRef, useState
} from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  children: React.ReactNode;
  styles?: TwStyle | SerializedStyles;
}

export function Li({ children, styles, }: Props) {
  const [ type, setType, ] = useState('');
  const [ isFirst, setIsFirst, ] = useState(null);
  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const parentList = liRef.current && liRef.current.parentElement;

    if (parentList.tagName === 'UL') {
      setType('ul');
    } else {
      setType('ol');
    }

    setIsFirst(parentList.parentElement.tagName === 'DIV');
  }, [ liRef.current, ]);

  const cond = useMemo(() => {
    return Array.isArray(children);
  }, [ children, ]);

  const style = {
    default: css([
      type === 'ul' && tw` [>span]:( flex items-center gap-1 ) [svg]:( shrink-0 self-start mt-[5px] ) text-justify break-all `,
      (type === 'ul') && isFirst && tw` not-first:mt-1 `,
      (type === 'ul') && !isFirst && tw` mt-1 `,

      (type === 'ol') && isFirst && tw` not-first:mt-1 `,
      (type === 'ol') && !isFirst && tw` mt-1 `,
      tw` [strong]:( text-inherit ) `,
      styles,
    ]),
  };

  console.log(children);
  console.log(cond);

  return (
    <>
      <li ref={liRef} css={style.default}>
        {(type === 'ul') && isFirst && (
          <span>
            <Icon icon='eva:arrow-right-fill' />
            <span>
              {!cond && children}
              {cond && (typeof children[1] !== 'string') && children}
              {cond && (typeof children[1] === 'string') && children[0]}
            </span>
          </span>
        )}
        {(type === 'ul') && !isFirst && (
          <span>
            <Icon icon='eva:arrow-right-outline' />
            <span>
              {!cond && children}
              {cond && (typeof children[1] !== 'string') && children}
              {cond && (typeof children[1] === 'string') && children[0]}
            </span>
          </span>
        )}
        {(type === 'ol') && isFirst && (
          <>
            {!cond && children}
            {cond && (typeof children[1] !== 'string') && children}
            {cond && (typeof children[1] === 'string') && children[0]}
          </>
        )}
        {(type === 'ol') && !isFirst && (
          <>
            {!cond && children}
            {cond && (typeof children[1] !== 'string') && children}
            {cond && (typeof children[1] === 'string') && children[0]}
          </>
        )}
        {cond && (typeof children[1] === 'string') && children[2]}
      </li>
    </>
  );
}
