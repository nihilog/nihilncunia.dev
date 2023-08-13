import { useEffect, useState } from 'react';

export type SizeState = {
  width: number;
  height: number;
};

export const useReSize = () => {
  const [ size, setSize, ] = useState<SizeState>({
    width: null,
    height: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reSize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', reSize);

      reSize();

      return () => {
        window.removeEventListener('resize', reSize);
      };
    } else {
      return () => {
        window.removeEventListener('resize', () => null);
      };
    }
  }, []);

  return size;
};
