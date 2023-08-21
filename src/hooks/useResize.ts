import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './rtk';
import { setWindowSize } from '@/reducers/dark.reducer';

export type SizeState = {
  width: number;
  height: number;
};

export const useReSize = () => {
  const { width, height, } = useAppSelector(
    (state) => state.dark
  );
  const dispatch = useAppDispatch();
  // const [ size, setSize, ] = useState<SizeState>({
  //   width: null,
  //   height: null,
  // });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reSize = () => {
        dispatch(setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        }));
        // setSize({
        //   width: window.innerWidth,
        //   height: window.innerHeight,
        // });
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

  return {
    width,
    height,
  };
};
