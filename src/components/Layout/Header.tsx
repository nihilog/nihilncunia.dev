import React, {
  useCallback, useEffect, useState
} from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import nihilLogo from '@/images/nihilncunia-dev.png';
import nihilLogoDark from '@/images/nihilncunia-dev-dark.png';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { toggleDarkMode } from '@/reducers/dark.reducer';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Header({ styles, }: Props) {
  const [ imageSrc, setImageSrc, ] = useState('');
  const [ icon, setIcon, ] = useState('');
  const isDark = useAppSelector(
    (state) => state.dark.isDark
  );
  const dispatch = useAppDispatch();

  const onClickDarkMode = useCallback(
    () => {
      dispatch(toggleDarkMode());
    },
    []
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      setImageSrc(nihilLogoDark.src);
      setIcon('material-symbols:dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      setImageSrc(nihilLogo.src);
      setIcon('material-symbols:light-mode');
    }
  }, [ isDark, ]);

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
    img: css([
      tw` inline-block `,
    ]),
    toggleDark: css([
      tw` p-2 border border-black-200 bg-white rounded-1 shadow-md `,
    ]),
  };

  return (
    <>
      <header css={style.default}>
        <div tw='mb-5 bg-white p-3 border border-black-200 mt-2 shadow-md rounded-1'>
          <Link href='/' aria-label='홈'>
            <img src={imageSrc} alt='니힐로그 로고' css={style.img} />
          </Link>
        </div>
        <div tw='flex items-center justify-end'>
          <button onClick={onClickDarkMode} css={style.toggleDark}>
            <Icon icon={icon} />
          </button>
        </div>
      </header>
    </>
  );
}
