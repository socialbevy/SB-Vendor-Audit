"use client"

import Image from 'next/image';
import FloatingCubes from '@/components/animations/FloatingCubes';
import ProtectedRoute from '@/lib/auth/ProtectedRoute';
import ubuntu from '@/utils/ubuntu';

const MarketplacePage = () => {
  return (
    <ProtectedRoute>
      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] mt-20 md:mt-0 md:min-h-screen bg-red-500 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/marketplace-background.jpeg"
            alt="Background"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Red Overlay */}
        <div className="absolute inset-0 z-10 bg-red-600 opacity-90"></div>

        {/* Floating Cubes */}
        <FloatingCubes />

        {/* Content */}
        <div className="relative z-30 flex flex-col md:flex-row items-center text-center text-white py-8 px-16 mt-16">
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Social Bevy"
              width={200}
              height={200}
            />
            <h1 className={`text-5xl font-bold mb-4 ${ubuntu.className}`}>You’re In!</h1>
            <p className="text-lg mb-4 max-w-md">
              Congrats! You’ll be FIRST to know when we open the doors to Social
              Bees. We’ll be dropping honey in your email soon
            </p>
            <p className={`text-xl font-bold ${ubuntu.className}`}>STAY TUNED!</p>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default MarketplacePage;
