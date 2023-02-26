import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Info = {
  [index: string]: unknown;
};
type NewsState = {
  info: Info;
};

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    info: {},
  } as NewsState,
  reducers: {
    updateInfo(state, action: PayloadAction<Info>) {
      state.info = action.payload;
    },
  },
});

export const { updateInfo } = newsSlice.actions;
export default newsSlice.reducer;
