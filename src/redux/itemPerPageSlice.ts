import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Quantity } from '../../components/types';

const initialState: Quantity = {
  quantity: 5,
};

const quantitySlice = createSlice({
  name: 'quantity',
  initialState,
  reducers: {
    changeQuantity: (state, action: PayloadAction<Quantity>) => action.payload,
  },
});

export const { changeQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
