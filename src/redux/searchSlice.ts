import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Search } from '../components/types';

const initialState: Search = {
  search: '',
};
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<Search>) => {
      state.search = action.payload.search;
    },
  },
});

export const { changeSearch } = searchSlice.actions;
export default searchSlice.reducer;
