import { createSlice } from '@reduxjs/toolkit';

interface IDarkMode {
  isDark: boolean;
}

const initialState: IDarkMode = {
  isDark: false,
};

const darkModeReducer = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleDarkMode, } = darkModeReducer.actions;
export default darkModeReducer.reducer;
