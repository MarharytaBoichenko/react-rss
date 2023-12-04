import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { IFormData } from '../types';
import { initialState } from './initialState';

export const controlledSlice = createSlice({
  name: 'hookForm',
  initialState,
  reducers: {
    getDataForm: (state, action: PayloadAction<IFormData>) => {
      console.log(action.payload);
      const newItem: IFormData = {
        id: uuidv4(),
        ...action.payload,
      };
      state.list = [newItem, ...state.list];
      return state;
    },
  },
});

export default controlledSlice.reducer;
