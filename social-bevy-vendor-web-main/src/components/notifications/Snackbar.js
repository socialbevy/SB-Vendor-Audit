import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ubuntu from '@/utils/ubuntu';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const showSnackbar = (message, type = 'default') => {
    toast(message, { type });
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <ToastContainer
        autoClose={3000}
        bodyClassName={`${ubuntu.className} text-gray-800`}
        draggable
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};