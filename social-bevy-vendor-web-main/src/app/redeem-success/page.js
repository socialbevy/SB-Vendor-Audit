'use client';

import React from 'react';
import Image from 'next/image';
import ubuntu from '@/utils/ubuntu';

const RedeemSuccessPage = () => {
  const handleClose = () => {
    window.close();
  };

  return (
    <main className="bg-white absolute top-0 left-0 right-0 bottom-0 z-50 flex flex-col items-center justify-center">
      <nav className="bg-white text-white px-4 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Social Bevy"
            width={100}
            height={40}
          />
        </div>
        <div className="flex space-x-4 pr-4">
          <h3 className={`text-black font-semibold text-3xl ${ubuntu.className}`}>Redeem Offer</h3>
        </div>
      </nav>
      <div className="text-green-500 text-center pb-8 px-8">
        Offer successfully redeemed!
      </div>
      <button onClick={handleClose} className="py-2 px-4 mx-8 bg-red-500 text-white font-bold rounded-md hover:bg-red-600">
        Close
      </button>
    </main>
  );
};

export default RedeemSuccessPage;
