import axios from 'axios';
import { configureAuth } from 'react-query-auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '@/components/notifications/Snackbar';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const createStripeCustomer = async (email, name) => {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { customerType: "vendor" }
  });
  return customer.id;
};

const getUser = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  
  try {
    const response = await axiosInstance.get('/auth/vendor/me');
    const user = response.data;

    if (!user.stripeCustomerId) {
      const customerId = await createStripeCustomer(user.email, `${user.fName} ${user.lName}`);
      await axiosInstance.patch(`/vendor/${user.id}/set-customer-id`, { stripeCustomerId: customerId });
      const updatedUserResponse = await axiosInstance.get('/auth/vendor/me');
      return updatedUserResponse.data;
    }

    return user;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await logout();
    }
    throw error;
  }
};

const login = async ({ email, password }) => {
  const response = await axiosInstance.post('/auth/vendor/login', { email, password });
  const { authToken } = response.data;
  localStorage.setItem('authToken', authToken);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  return response.data;
};

const register = async (formData) => {
  const response = await axiosInstance.post('/auth/vendor/signup', formData);
  const { authToken } = response.data;
  localStorage.setItem('authToken', authToken);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  return response.data;
};

const editVendorProfile = async ({ id, formData }) => {
  const response = await axiosInstance.patch(`vendor/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const logout = async () => {
  localStorage.removeItem('authToken');
  delete axiosInstance.defaults.headers.common['Authorization'];
  return Promise.resolve();
};

const authConfig = {
  userFn: getUser,
  loginFn: login,
  registerFn: register,
  logoutFn: logout,
  userKey: ['user'],
};

const { AuthLoader, useUser, useLogin, useRegister, useLogout } = configureAuth(authConfig);

const useEditVendor = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();

  return useMutation({
    mutationFn: editVendorProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      showSnackbar("Profile data updated successfully!", 'success');
    },
    onError: (error) => {
      showSnackbar(error.message, 'error');
    },
  });
};

export { AuthLoader, useUser, useLogin, useRegister, useLogout, useEditVendor };
