'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Spinner from "@/components/shared/Spinner";
import { useUserOffer, useRedeemOffer } from '@/lib/features/offers/useOffers';
import ubuntu from '@/utils/ubuntu';

const RedeemPage = () => {
  const { user_offer_id } = useParams();
  const router = useRouter();
  const { data: userOffer, status, error } = useUserOffer(user_offer_id);
  const { offer } = userOffer || {};
  const { mutate: redeemOffer, isLoading: redeeming, error: redemptionError } = useRedeemOffer();

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (error?.response?.status === 404) {
      setErrorMessage('This offer no longer exists.');
    } else if (userOffer?.payload === 'The offer is not redeemable based on the current usage limits and cycles.') {
      setErrorMessage(userOffer.payload);
    }
  }, [error, userOffer]);

  const handleConfirmPurchase = async () => {
    try {
      await redeemOffer(user_offer_id);
      router.push('/redeem-success');
    } catch (error) {
      console.error('Error confirming purchase:', error);
      setErrorMessage('Error confirming purchase.');
    }
  };

  const handleClose = () => {
    window.close();
  };

  if (status === 'loading' || redeeming || (!userOffer && !error)) {
    return (
      <div className="bg-white absolute top-0 left-0 right-0 bottom-0 z-50">
        <Spinner />
      </div>
    );
  }

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
      <div className="flex items-center justify-center">
        {errorMessage ? (
          <div className="flex flex-col">
            <div className="text-red-500 text-center pb-8 px-8">
              {errorMessage}
            </div>
            <button onClick={handleClose} className="py-2 px-4 mx-8 bg-red-500 text-white font-bold rounded-md hover:bg-red-600">
              Close
            </button>
          </div>
        ) : (
          offer && (
            <div className="flex flex-col p-4">
              <div className="flex flex-col items-center flex-grow">
                <div className="font-bold text-lg mb-2 text-center">
                  {offer?.offerName}
                </div>
                <div className="mt-auto">
                  <p className="text-gray-700 text-2xl">
                    <span className="line-through">${offer?.originalPrice}</span> <span className="text-red-500">${offer?.discountPrice}</span>
                  </p>
                  <p className="text-green-600 font-bold text-2xl">
                    {Math.round((1 - offer?.discountPrice / offer.originalPrice) * 100)}% OFF
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4 mt-4 w-full">
                <button onClick={handleConfirmPurchase} className="py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600">
                  Confirm Purchase
                </button>
                <button onClick={handleClose} className="py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600">
                  Close
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default RedeemPage;
