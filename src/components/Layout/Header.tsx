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
import { toggleDarkMode, toggleMenu } from '@/reducers/dark.reducer';
import { configData } from '@/data';
import { useReSize } from '@/hooks';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Header({ styles, }: Props) {
  const [ imageSrc, setImageSrc, ] = useState('');
  const [ icon, setIcon, ] = useState('');
  const [ scrollY, setScrollY, ] = useState(0);
  const { isDark, } = useAppSelector(
    (state) => state.dark
  );
  const dispatch = useAppDispatch();
  const windowSize = useReSize();

  const onClickDarkMode = useCallback(
    () => {
      dispatch(toggleDarkMode());
    },
    []
  );

  const onClickOpen = useCallback(
    () => {
      dispatch(toggleMenu());
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

  useEffect(() => {
    const scrollEvent = () => {
      setScrollY(window.scrollY);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollEvent);
    }

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [ scrollY, ]);

  const style = {
    default: css([
      tw` shadow-md relative z-10 `,
      styles,
    ]),
    toggleDark: css([
      tw` w-[45px] aspect-square flex items-center justify-center bg-white shrink-0 `,
      tw` text-blue-600 dark:text-yellow-400 [svg]:( text-[150%] ) `,
    ]),
    menu: css([
      tw` w-[45px] aspect-square flex items-center justify-center bg-white border-black-200 shrink-0 `,
    ]),
    version: tw` flex items-center flex-1 shrink-0 p-2 bg-white text-black-base font-black `,
    headerBottom: css([
      tw` mt-2 flex divide-x divide-black-200 border border-black-200 `,
      scrollY > 139 && tw` fixed top-0 mt-0 left-0 shadow-md shadow-black-base/50 w-full z-10 `,
    ]),
  };

  return (
    <>
      <header css={style.default}>
        {windowSize.width >= 1024 && (
          <div tw='mt-2 p-3 bg-white border border-black-200 shadow-md'>
            <Link href='/' aria-label='홈'>
              <img src={imageSrc} alt='니힐로그 로고' />
            </Link>
          </div>
        )}
        <div css={style.headerBottom}>
          {windowSize.width < 1024 && (
            <button css={style.menu} onClick={onClickOpen}>
              <Icon icon='mingcute:menu-fill' />
            </button>
          )}
          <div css={style.version}>
            <p>
              <Link href='/' aria-label='홈'>
                니힐로그 {configData.version}
              </Link>
            </p>
          </div>
          <button onClick={onClickDarkMode} css={style.toggleDark}>
            <Icon icon={icon} />
          </button>
        </div>
      </header>
    </>
  );
}
