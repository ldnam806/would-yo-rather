import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasNotFound: false,
  currentPath: '/',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setNotFound: (state, { payload }) => {
      state.hasNotFound = payload;
    },
    setCurrentPath: (state, { payload }) => {
      state.currentPath = payload;
    },
  },
});

export const { setNotFound, setCurrentPath } = commonSlice.actions;
export const selectNotFound = (state) => state.common.hasNotFound;
export const selectCurrentPath = (state) => state.common.currentPath;

export default commonSlice.reducer;
