import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Infos = {
  [index: string]: unknown;
};

type ChecksState = {
  applyList: Infos[];
  checkList: Infos[];
};

const checksSlice = createSlice({
  name: 'checks',
  initialState: {
    applyList: [],
    checkList: [],
  } as ChecksState,
  reducers: {
    updateApplyList(state, action: PayloadAction<Infos[]>) {
      state.applyList = action.payload;
    },
    updateCheckList(state, action: PayloadAction<Infos[]>) {
      state.checkList = action.payload;
    },
  },
});

export const { updateApplyList, updateCheckList } = checksSlice.actions;

export default checksSlice.reducer;
