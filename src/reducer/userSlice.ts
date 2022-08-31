import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenType {
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
  },
});

export const { addToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
