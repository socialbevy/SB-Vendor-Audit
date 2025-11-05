'use client';

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useUser } from "@/lib/auth/authConfig";
import BackButton from "@/components/buttons/BackButton";
import CreateLocationForm from "@/components/forms/CreateLocationForm";
import LocationCard from "@/components/cards/LocationCard";
import { useVendorLocations } from "@/lib/features/vendorLocations/useVendorLocations";
import { openModal } from "@/lib/features/modal/modalSlice";
import ubuntu from "@/utils/ubuntu";

const LocationsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: vendor } = useUser({
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
  const { data: locations, status, error } = useVendorLocations(vendor?.id);
  const searchParams = useSearchParams();
  const backToDashboard = searchParams.get('backToDashboard');

  const handleBack = () => {
    const backUrl = backToDashboard ? "/" : "/settings";
    router.push(backUrl);
  };

  const openDeleteModal = (locationId) => {
    dispatch(openModal({
      type: 'deleteLocation',
      props: { locationId }
    }));
  };

  return (
    <div className="mt-16 md:mt-0">
      <div className="border-b border-gray-300 md:hidden">
        <BackButton onClick={handleBack}>Back</BackButton>
      </div>
      <div className="p-2 md:p-4">
        <div className="flex items-center justify-between max-w-2xl mb-4">
          <h1 className={`text-2xl font-bold md:px-0 ${ubuntu.className}`}>Locations</h1>
          <CreateLocationForm vendorId={vendor?.id} isOpen={backToDashboard} />
        </div>
        <div className="max-w-2xl">
        {status === 'loading' ? (
          <p>Loading locations...</p>
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : locations && locations.length ? (
          <ul>
            {locations.map((location, index) => {
              const first = index === 0;
              return (
                <li key={location.id} className={`border-b border-gray-200 ${first && `border-t`}`}>
                  <LocationCard location={location} openDeleteModal={openDeleteModal} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No locations yet. Add your first location above.</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
