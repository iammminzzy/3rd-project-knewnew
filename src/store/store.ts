import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../reducer/userSlice';

export interface RootState {
  tokenState: {
    value: string;
  };
}

export default configureStore({
  reducer: {
    tokenState: tokenReducer,
  },
});
