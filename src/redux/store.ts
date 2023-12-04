import { configureStore } from '@reduxjs/toolkit';
import controlledSlice from './formSlice';

const store = configureStore({
  reducer: {
    formControlled: controlledSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
