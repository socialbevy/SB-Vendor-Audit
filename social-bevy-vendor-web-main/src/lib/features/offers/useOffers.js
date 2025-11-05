"use client"

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

const fetchOffers = async () => {
  const response = await axiosInstance.get('offers');
  return response.data;
};

const fetchOffersByVendor = async (vendorId) => {
  const response = await axiosInstance.get(`offers/vendors/${vendorId}`);
  return response.data;
};

const fetchOfferById = async (offerId) => {
  const response = await axiosInstance.get(`offers/${offerId}`);
  return response.data;
};

const fetchUserOffer = async (userOfferId) => {
  const response = await axiosInstance.get(`redeem/${userOfferId}`);
  return response.data;
};

const redeemOffer = async (userOfferId) => {
  const response = await axiosInstance.patch(`redeem/success/${userOfferId}`);
  return response.data;
};

const createOffer = async (offerData) => {
  const response = await axiosInstance.post('offers', offerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const editOffer = async ({ offerId, offerData }) => {
  const response = await axiosInstance.patch(`offers/${offerId}`, offerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const editOfferActive = async ({ offerId, active }) => {
  const response = await axiosInstance.patch(`offers/${offerId}/active`, { active });
  return response.data;
}

const deleteOffer = async (offerId) => {
  await axiosInstance.delete(`offers/${offerId}`);
  return offerId;
};

export const useOffers = () => {
  return useQuery({
    queryKey: ['offers'],
    queryFn: fetchOffers,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useOffersByVendor = (vendorId) => {
  return useQuery({
    queryKey: ['offers', vendorId],
    queryFn: () => fetchOffersByVendor(vendorId),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useOfferById = (offerId) => {
  return useQuery({
    queryKey: ['offer', offerId],
    queryFn: () => fetchOfferById(offerId),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useUserOffer = (userOfferId) => {
  return useQuery({
    queryKey: ['userOffer', userOfferId],
    queryFn: () => fetchUserOffer(userOfferId),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useRedeemOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: redeemOffer,
    onSuccess: () => {
      queryClient.invalidateQueries(['userOffer']);
    }
  })
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOffer,
    onSuccess: () => {
      queryClient.invalidateQueries(['offers']);
    },
    onError: () => {

    }
  });
};

export const useEditOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editOffer,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['offer', data.id]);
      queryClient.invalidateQueries(['offers']);
    },
  });
};

export const useEditOfferActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editOfferActive,
    onMutate: async ({ offerId, active }) => {
      await queryClient.cancelQueries({ queryKey: ['offers', offerId] });

      const previousOffer = queryClient.getQueryData(['offers', offerId]);

      queryClient.setQueryData(['offers', offerId], (old) => ({ ...old, active }));

      return { previousOffer };
    },
    onError: (err, { offerId }, context) => {
      queryClient.setQueryData(['offers', offerId], context.previousOffer);
    },
    onSettled: (data, error, { offerId }) => {
      queryClient.invalidateQueries({ queryKey: ['offers', offerId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOffer,
    onSuccess: () => {
      queryClient.invalidateQueries(['offers']);
    },
  });
};
