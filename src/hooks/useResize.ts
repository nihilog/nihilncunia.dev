import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './rtk';
import { setWindowSize } from '@/src/reducers/dark.reducer';

export const useReSize = () => {
  const { width, height, } = useAppSelector(
    (state) => state.dark
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reSize = () => {
        dispatch(setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        }));
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
