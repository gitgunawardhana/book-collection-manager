import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeSlice from '../features/theme/themeSlice';
import booksReducer from '../features/books/booksSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
