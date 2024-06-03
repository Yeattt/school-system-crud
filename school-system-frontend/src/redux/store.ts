import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './features/modalSlice';
import alertReducer from './features/alertSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;