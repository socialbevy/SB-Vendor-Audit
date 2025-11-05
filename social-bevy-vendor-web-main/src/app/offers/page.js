'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import OfferCard from '@/components/cards/OfferCard';
import CreateOfferForm from '@/components/forms/CreateOfferForm';
import ToggleSwitch from '@/components/inputs/ToggleSwitch';
import ProtectedRoute from '@/lib/auth/ProtectedRoute';
import { useUser } from '@/lib/auth/authConfig';
import { useSnackbar } from '@/components/notifications/Snackbar';
import { useOffersByVendor, useEditOfferActive } from '@/lib/features/offers/useOffers';
import ubuntu from '@/utils/ubuntu';

const OffersPage = () => {
  const showSnackbar = useSnackbar();
  const { data: vendor } = useUser({
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
  const { data: offers, status, error, refetch } = useOffersByVendor(vendor?.id);
  const editOfferActive = useEditOfferActive();
  const searchParams = useSearchParams();
  const showCreateOfferForm = searchParams.get('showCreateOfferForm');
  const isSubscribed = vendor.membershipPlan === "Soci-Data Advanced";

  const handleToggleSwitch = (offer) => {
    editOfferActive.mutate(
      { offerId: offer.id, active: !offer.active },
      {
        onSuccess: () => {
          showSnackbar(`Offer is now ${!offer.active ? 'active' : 'inactive'}`, 'success');
          refetch();
        },
        onError: () => {
          showSnackbar("There was an error updating the offer's active status.", 'error');
        }
      }
    );
  };

  return (
    <ProtectedRoute>
      <main className="md:min-h-full mt-20 md:mt-0">
        <div className="mx-auto">
          <h1 className={`md:flex text-2xl font-semibold p-4 bg-white md:border-b border-gray-200 ${ubuntu.className}`}>
            Offers
          </h1>
          <div className="bg-white p-6 md:p-8 min-h-[calc(100vh-144px)] md:min-h-[calc(100vh-65px)]">
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-3xl mb-4">
                <h1 className={`text-2xl font-bold md:px-0 ${ubuntu.className}`}>{vendor.businessName} Offers</h1>
                <CreateOfferForm vendorId={vendor?.id} isOpen={showCreateOfferForm} />
              </div>
              {!isSubscribed && (
                  <p className="mb-2">In order to switch your offers to active, make sure to subscribe <Link className="text-red-500" href="settings/subscription">here.</Link></p>
                )}
              <div>
                {status === 'loading' ? (
                  <p>Loading offers...</p>
                ) : error ? (
                  <p className="text-red-500">{error.message}</p>
                ) : offers?.length === 0 ? (
                  <p>No offers yet. Create your first offer above.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                    {offers?.map((offer) => (
                      <div key={offer.id} className="relative">
                        <Link
                          className="cursor-pointer group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                          href={`offers/${offer.id}`}
                        >
                          <OfferCard offer={offer} />
                        </Link>
                        {isSubscribed && (
                          <div className="absolute bottom-2 right-2 p-4">
                            <ToggleSwitch
                              checked={offer?.active}
                              onChange={() => handleToggleSwitch(offer)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default OffersPage;
