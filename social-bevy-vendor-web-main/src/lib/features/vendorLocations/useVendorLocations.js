import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

const fetchLocationsByVendor = async (vendorId) => {
  const response = await axiosInstance.get(`vendor_locations/vendors/${vendorId}`);
  return response.data;
};

const createLocation = async (locationData) => {
  const response = await axiosInstance.post('vendor_locations', locationData);
  return response.data;
};

const editLocation = async ({ locationId, locationData }) => {
  const response = await axiosInstance.patch(`vendor_locations/${locationId}`, locationData);
  return response.data;
};

const deleteLocation = async (locationId) => {
  await axiosInstance.delete(`vendor_locations/${locationId}`);
  return locationId;
};

export const useVendorLocations = (vendorId) => {
  return useQuery({
    queryKey: ['vendorLocations', vendorId],
    queryFn: () => fetchLocationsByVendor(vendorId),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries(['vendorLocations']);
    },
  });
};

export const useEditLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editLocation,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['vendorLocations']);
    },
  });
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries(['vendorLocations']);
    },
  });
};
