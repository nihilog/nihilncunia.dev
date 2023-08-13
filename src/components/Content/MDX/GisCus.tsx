import React, { useEffect, useRef } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function GisCus({ styles, }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  const ID = 'post-comments';

  useEffect(() => {
    if (!divRef.current || divRef.current.hasChildNodes()) {
      return;
    }

    const script = document.createElement('script');

    script.src = 'https://giscus.app/client.js';
    script.async = true;

    script.setAttribute('data-repo', 'nihilog/nihilncunia.dev');
    script.setAttribute('data-repo-id', 'R_kgDOJdhShg');
    script.setAttribute('data-category', 'Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOJdhShs4CXXpQ');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');

    divRef.current.appendChild(script);
  }, []);

  return (
    <>
      <div id={ID} css={style.default} ref={divRef} />
    </>
  );
}
