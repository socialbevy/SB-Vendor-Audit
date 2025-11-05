'use client';

import React from 'react';
import { useUser } from '@/lib/auth/authConfig';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/shared/Spinner';

const ProtectedRoute = ({ children }) => {
  const { data: vendor, isLoading, isError } = useUser({
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  if (!vendor || isError) {
    router.push('/login');
    return null;
  }

  return children;
};

export default ProtectedRoute;
