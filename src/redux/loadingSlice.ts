import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Loading } from '../components/types';

const initialState: Loading = {
  loadingMain: false,
  loadingDetailed: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeMainLoading: (state, action: PayloadAction<Loading>) => action.payload,
    changeDetailedLoading: (state, action: PayloadAction<Loading>) => {
      return action.payload;
    },
  },
});

export const { changeMainLoading, changeDetailedLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
