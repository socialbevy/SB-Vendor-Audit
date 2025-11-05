'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

const StoreProvider = ({ children }) => {
  const storeRef = useRef(store);

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
};

export default StoreProvider;
