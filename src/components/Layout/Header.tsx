import React, {
  useCallback, useEffect, useMemo, useRef, useState
} from 'react';
import tw, { TwStyle, css, styled } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/src/hooks/rtk';
import { setIsOpen, toggleDarkMode, toggleMenu } from '@/src/reducers/dark.reducer';
import { configData } from '@/src/data';
import { textStyles } from '@/src/styles';
import { useScroll } from '@/src/hooks';
import { ScrollProgressBar } from '../Content';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Header({ styles, }: Props) {
  const [ icon, setIcon, ] = useState('');
  const scroll = useScroll();
  const [ bottomHeight, setBottomHeight, ] = useState(0);

  const { isDark, width, } = useAppSelector(
    (state) => state.dark
  );
  const dispatch = useAppDispatch();
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const imageSrc = useMemo(() => {
    return isDark
      ? '/images/nihilncunia-dev-dark.png'
      : '/images/nihilncunia-dev.png';
  }, [ isDark, ]);

  useEffect(() => {
    dispatch(setIsOpen({ value: false, }));
  }, [ router.asPath, ]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      setIcon('material-symbols:light-mode');
    } else {
      document.documentElement.classList.remove('dark');
      setIcon('material-symbols:dark-mode');
    }
  }, [ isDark, ]);

  useEffect(() => {
    if (bottomRef.current) {
      setBottomHeight(bottomRef.current.clientHeight + 10);
    }
  }, [ scroll.y, ]);

  const style = {
    default: css([
      tw` relative z-10 `,
      styles,
    ]),
    toggleDark: css([
      tw` w-[45px] aspect-square flex items-center justify-center bg-white shrink-0 dark:bg-black-500 `,
      tw` text-blue-600 dark:text-yellow-300 [svg]:( text-[150%] ) `,
    ]),
    menu: css([
      tw` w-[45px] aspect-square flex items-center justify-center bg-white border-black-200 shrink-0 dark:( border-black-400 bg-black-500 text-white ) `,
    ]),
    version: tw` flex items-center flex-1 shrink-0 p-2 bg-white text-black-base dark:( bg-black-500 text-white ) font-black `,
    headerBottom: css([
      tw` mt-2 flex divide-x divide-black-200 border border-black-200 shadow-md dark:( divide-black-400 border-black-400 ) `,
      ((width < 1024) || (scroll.y > 150)) && tw` fixed mt-0 left-0 shadow-lg shadow-black-base/50 w-full z-10 `,
      ((width < 1024) || (scroll.y > 150)) && router.asPath.includes('posts') && tw` top-[8px] `,
      ((width < 1024) || (scroll.y > 150)) && !router.asPath.includes('posts') && tw` top-0 `,
    ]),
  };

  return (
    <>
      <header css={style.default}>
        {router.asPath.includes('posts') && (
          <ScrollProgressBar />
        )}
        {width >= 1024 && (
          <div tw='mt-2 p-3 bg-white border border-black-200 shadow-md dark:( border-black-400 bg-black-500 )'>
            <Link href='/' aria-label='홈'>
              <Image
                src={imageSrc}
                alt='니힐로그 로고'
                width={0}
                height={0}
                layout='responsive'
                tw='w-[400px]! h-auto'
              />
            </Link>
          </div>
        )}
        {((width < 1024) || (scroll.y > 150)) && (
          <DummyDiv bottomHeight={bottomHeight} />
        )}
        <div css={style.headerBottom} ref={bottomRef}>
          {width < 1024 && (
            <button css={style.menu} onClick={onClickOpen}>
              <span css={textStyles.hidden}>메뉴버튼</span>
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
            <span css={textStyles.hidden}>
              {isDark ? '라이트 모드로 보기' : '다크 모드로 보기'}
            </span>
            <Icon icon={icon} />
          </button>
        </div>
      </header>
    </>
  );
}

const DummyDiv = styled.div<{bottomHeight: number}>`
  height: ${(props) => props.bottomHeight}px;
`;
