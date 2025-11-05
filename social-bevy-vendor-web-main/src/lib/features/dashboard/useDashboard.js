import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const fetchDashboard = async (vendorId) => {
  const response = await axiosInstance.get(`dashboard/vendor/${vendorId}`);
  return response.data;
};

export const useDashboard = (vendorId) => {
  return useQuery({
    queryKey: ['dashboard', vendorId],
    queryFn: () => fetchDashboard(vendorId),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
};