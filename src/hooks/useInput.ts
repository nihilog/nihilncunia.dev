import { useCallback, useRef, useState } from 'react';

export interface InputElementState {
  value: any;
  id: string;
  onChange: () => void;
  ref: React.MutableRefObject<HTMLInputElement>;
}

export interface TextAreaElementState {
  value: any;
  id: string;
  onChange: () => void;
  ref: React.MutableRefObject<HTMLTextAreaElement>;
}

export interface SelectElementSatate {
  defaultValue: string;
  value: any;
  id: string;
  onChange: () => void;
  ref: React.MutableRefObject<HTMLSelectElement>;
}

// type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export const useInput = <T>(id: string, init = null) => {
  const [ value, setValue, ] = useState(init);
  const ref = useRef<T>();

  const onChange = useCallback(() => {
    setValue((ref.current as any).value);
  }, []);

  return {
    data: {
      value, id, onChange, ref,
    },
    setValue,
  };
};
