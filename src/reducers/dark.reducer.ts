import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFrontMatter } from '../types/mdx.types';

type Level5 = {
  no: number;
  parentNo: string;
  content: string;
};

type Level4 = {
  no: number;
  parentNo: string;
  content: string;
  child: Level5[];
};

type Level3= {
  no: number;
  parentNo: string;
  content: string;
  child: Level4[];
};

type Level2 = {
  no: number;
  parentNo: string;
  content: string;
  child: Level3[];
};

export type Level1 = {
  no: number;
  content: string;
  child: Level2[];
};

interface IDarkMode {
  isDark: boolean;
  isOpen: boolean;
  width: number;
  height: number;
  headerHeight: number;
  toc: Level1[];
  keyword: string;
  posts: IFrontMatter[];
  postId: number;
}

const initialState: IDarkMode = {
  isDark: false,
  isOpen: false,
  width: 0,
  height: 0,
  headerHeight: 0,
  toc: [],
  keyword: '',
  posts: [],
  postId: 0,
};

const darkModeReducer = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDark = !state.isDark;
    },
    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    },
    setIsOpen(
      state,
      { payload, }: PayloadAction<{ value: boolean }>
    ) {
      state.isOpen = payload.value;
    },
    setWindowSize(
      state,
      { payload, }: PayloadAction<{ width?: number; height?: number; }>
    ) {
      state.width = payload.width;
      state.height = payload.height;
    },
    setHeaderHeight(
      state,
      { payload, }: PayloadAction<{ value: number }>
    ) {
      state.headerHeight = payload.value;
    },
    setToc(
      state,
      { payload, }: PayloadAction<{value: Level1[]}>
    ) {
      state.toc = payload.value;
    },
    setKeyword(
      state,
      { payload, }: PayloadAction<{value: string}>
    ) {
      state.keyword = payload.value;
    },
    setPosts(
      state,
      { payload, }: PayloadAction<{value: IFrontMatter[]}>
    ) {
      state.posts = payload.value;
    },
    setPostId(
      state,
      { payload, }: PayloadAction<{value: number}>
    ) {
      state.postId = payload.value;
    },
  },
});

export const {
  toggleDarkMode, toggleMenu, setIsOpen, setWindowSize, setHeaderHeight, setToc, setKeyword, setPosts, setPostId,
} = darkModeReducer.actions;
export default darkModeReducer.reducer;
