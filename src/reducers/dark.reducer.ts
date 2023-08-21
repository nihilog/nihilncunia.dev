import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IDarkMode {
  isDark: boolean;
  isOpen: boolean;
  width: number;
  height: number;
}

const initialState: IDarkMode = {
  isDark: false,
  isOpen: false,
  width: 0,
  height: 0,
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
    setIsOpen(state, { payload, }: PayloadAction<{value: boolean}>) {
      state.isOpen = payload.value;
    },
    setWindowSize(state, { payload, }: PayloadAction<{ width: number; height: number; }>) {
      state.width = payload.width;
      state.height = payload.height;
    },
  },
});

export const {
  toggleDarkMode, toggleMenu, setIsOpen, setWindowSize,
} = darkModeReducer.actions;
export default darkModeReducer.reducer;
