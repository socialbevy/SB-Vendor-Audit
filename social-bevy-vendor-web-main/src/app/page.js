'use client'

import React from 'react';
import LandingPage from '@/components/home/LandingPage';
import { useUser } from '@/lib/auth/authConfig';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Home() {
  const { data: vendor } = useUser();

  if (vendor) {
    return (
      <Dashboard vendorId={vendor.id} />
    );
  }

  return (
    <LandingPage />
  );
}
