import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { FormData, FormDataList } from '../types';
const initialState: FormDataList = {
  list: [],
};

export const controlledSlice = createSlice({
  name: 'hookForm',
  initialState,
  reducers: {
    getDataForm: (state, action: PayloadAction<FormData>) => {
      const newItem = {
        ...action.payload,
        id: uuidv4(),
      };
      state.list = [...state.list, newItem];
      console.log(state.list);
      return state;
    },
  },
});

export default controlledSlice.reducer;
