import { createSlice } from '@reduxjs/toolkit';

interface IDarkMode {
  isDark: boolean;
  isOpen: boolean;
}

const initialState: IDarkMode = {
  isDark: false,
  isOpen: false,
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
  },
});

export const { toggleDarkMode, toggleMenu, } = darkModeReducer.actions;
export default darkModeReducer.reducer;
