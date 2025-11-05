import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './features/modal/modalSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalSlice,
    },
  });
};

export const store = makeStore();
