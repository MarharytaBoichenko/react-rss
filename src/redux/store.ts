import { configureStore } from '@reduxjs/toolkit';
import controlledSlice from './formSlice';

const store = configureStore({
  reducer: {
    formControlled: controlledSlice,
    // quantity: quantitySlice,
    // loading: loadingSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
