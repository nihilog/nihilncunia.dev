import { useEffect, useState } from 'react';

export const useScroll = () => {
  const [ scrollY, setScrollY, ] = useState(0);
  const [ progress, setProgress, ] = useState(0);

  useEffect(() => {
    const currentY = document.documentElement.scrollTop;
    const totalY = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    setProgress(Math.floor((currentY / totalY) * 100));

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

  return {
    progress,
    y: scrollY,
  };
};
