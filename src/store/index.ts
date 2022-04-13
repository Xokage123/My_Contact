import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import contactsSlice from './slices/contactsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    contacts: contactsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
