import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import favoriteSlice from './slices/favoriteSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    favorite: favoriteSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;