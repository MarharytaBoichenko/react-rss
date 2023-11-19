import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Loading } from '../components/types';

const initialState: Loading = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<Loading>) => action.payload,
  },
});

export const { changeLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
