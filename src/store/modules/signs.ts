import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Infos = {
  [index: string]: unknown;
};
type SignsState = {
  infos: Infos;
};

const signsSlice = createSlice({
  name: 'signs',
  initialState: {
    infos: {},
  } as SignsState,
  reducers: {
    updateInfos(state, action: PayloadAction<Infos>) {
      state.infos = action.payload;
    },
  },
});

export const { updateInfos } = signsSlice.actions;
export default signsSlice.reducer;
