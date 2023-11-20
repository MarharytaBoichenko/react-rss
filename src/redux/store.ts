import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import quantitySlice from './itemPerPageSlice';
import loadingSlice from './loadingSlice';
import { galleryApi } from './gallerySlice';

const store = configureStore({
  reducer: {
    [galleryApi.reducerPath]: galleryApi.reducer,
    search: searchSlice,
    quantity: quantitySlice,
    loading: loadingSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(galleryApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
