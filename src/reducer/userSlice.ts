import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TokenType {
  value: string;
}

const initialState: TokenType = {
  value: '',
};

export const tokenSlice = createSlice({
  name: 'tokenState',
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    removeToken: state => {
      state.value = '';
    },
    test: state => {
      state.value = '123';
    },
  },
});

export const { addToken, removeToken, test } = tokenSlice.actions;

export default tokenSlice.reducer;
