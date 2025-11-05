'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/forms/SignupForm';
import Spinner from '@/components/shared/Spinner';
import { useUser } from '@/lib/auth/authConfig';
import ubuntu from '@/utils/ubuntu';

const SignupPage = () => {
  const { data: vendor, isLoading } = useUser({
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && vendor) {
      router.push('/');
    }
  }, [isLoading, vendor, router]);

  if (isLoading) {
    return <Spinner minHeight="calc(100vh - 314px)" />
  }

  return (
    <div className="min-h-[calc(100vh-314px)] bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg flex mt-12">
        {/* Left Side */}
        <div className="hidden md:block w-1/2 bg-cover bg-center rounded-l-lg" style={{ backgroundImage: `url('/images/signup-bg.jpeg')` }}>
          <div className="h-full flex items-center justify-center bg-black bg-opacity-50 rounded-l-lg">
            <h2 className={`text-white text-2xl font-bold ${ubuntu.className}`}>Vendor Sign Up</h2>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8">
          <SignupForm router={router} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
