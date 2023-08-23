import React, { useMemo } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Icon } from '@iconify/react';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

interface FooterLink {
  href: string;
  label: string;
  icon: string;
  target: string;
}

const footerLinks: FooterLink[] = [
  {
    href: 'mailto:nihil_ncunia@naver.com',
    target: '_self',
    label: 'Email',
    icon: 'mdi:email-outline',
  },
  {
    href: 'https://www.instagram.com/nihil_illust/',
    target: '_blank',
    label: 'Instagram',
    icon: 'mdi:instagram',
  },
  {
    href: 'https://github.com/NIHILncunia',
    target: '_blank',
    label: 'Github',
    icon: 'mdi:github',
  },
];

export function Footer({ styles, }: Props) {
  const startYear = 2023;
  const nowYear = new Date().getFullYear();

  const year = useMemo(() => {
    return startYear < nowYear
      ? `${startYear}-${nowYear}`
      : startYear;
  }, [ nowYear, ]);

  const style = {
    default: css([
      tw` space-y-2 mb-2 `,
      styles,
    ]),
    copy: css([
      tw` p-3 border border-black-200 shadow-md bg-white text-black-base dark:( bg-black-500 border-black-400 text-white ) `,
      tw` [small]:( flex items-center justify-center gap-1 font-900 text-[90%] ) `,
    ]),
    linkContainer: css([
      tw` flex flex-row justify-center gap-3 `,
    ]),
    link: css([
      tw` border border-black-200 text-black-base dark:( bg-black-500 border-black-400 text-white ) p-2 bg-white text-[140%] shadow-md transition-all duration-200 `,
      tw` hover:( text-blue-600 border-blue-500 bg-blue-100 dark:( border-yellow-300 text-yellow-300 bg-black-600 ) ) `,
    ]),
  };

  return (
    <>
      <footer css={style.default}>
        <div css={style.linkContainer}>
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              target={link.target}
              rel='noreferrer noopener'
              css={style.link}
            >
              <Icon icon={link.icon} />
            </a>
          ))}
        </div>
        <div css={style.copy}>
          <small>
            <Icon icon='ic:round-copyright' /> {year}. NIHILncunia.
          </small>
        </div>
      </footer>
    </>
  );
}
