import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Token = string;
type Infos = {
  [index: string]: unknown;
};
type UsersState = {
  token: Token;
  infos: Infos;
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    token: '',
    infos: {},
  } as UsersState,
  reducers: {
    updateToken(state, action: PayloadAction<Token>) {
      state.token = action.payload;
    },
    updateInfos(state, action: PayloadAction<Infos>) {
      state.infos = action.payload;
    },
    clearToken(state) {
      state.token = '';
    },
  },
});

export const { updateToken, updateInfos, clearToken } = usersSlice.actions;

export default usersSlice.reducer;
