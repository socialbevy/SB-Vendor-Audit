'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import ubuntu from '@/utils/ubuntu';

const Section3 = () => {
  const router = useRouter();

  return (
    <section className="relative px-4 py-24 bg-gray-100 w-full">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className={`text-3xl font-bold mb-2 ${ubuntu.className}`}>Our Users, <span className="text-red-500">Your Customers</span></h2>
        <p className="text-lg mb-4">We currently have many users across the greater Houston area.</p>
        <button onClick={() => router.push('/signup')} className="bg-red-500 text-white px-6 py-2 rounded-md text-lg">Join Now</button>
      </div>
    </section>
  );
};

export default Section3;