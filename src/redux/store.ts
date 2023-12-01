import { configureStore } from '@reduxjs/toolkit';
import controlledSlice from './formSlice';
// import { AnyAction, combineReducers } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
// import searchSlice from './searchSlice';
// import quantitySlice from './itemPerPageSlice';
// import loadingSlice from './loadingSlice';
// import { galleryApi } from './gallerySlice';

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
// export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
