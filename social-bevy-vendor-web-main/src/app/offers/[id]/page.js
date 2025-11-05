'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/legacy/image';
import { useParams, useRouter } from "next/navigation";
import { useOfferById } from '@/lib/features/offers/useOffers';
import BackButton from "@/components/buttons/BackButton";
import EditOfferForm from "@/components/forms/EditOfferForm";
import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import Spinner from "@/components/shared/Spinner";
import ToggleSwitch from "@/components/inputs/ToggleSwitch";
import ubuntu from "@/utils/ubuntu";

const OfferDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: offer, status, error } = useOfferById(id);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (offer && offer.mainImage) {
      setCurrentImage(offer.mainImage.url);
    }
  }, [offer]);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  if (!offer) {
    return null;
  }

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
  };

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-between bg-white p-4 md:border-b border-gray-200 mt-20 md:mt-0">
        <h1 className={`text-2xl font-semibold ${ubuntu.className}`}>
          View/Edit Offer
        </h1>
        <div className="flex items-center">
          <p className="mr-2">View</p>
          <ToggleSwitch
            checked={isEditing}
            onChange={() => setIsEditing((prev) => !prev)}
          />
          <p className="ml-2">Edit</p>
        </div>
      </div>
      <div className="container p-6 md:p-8 bg-white">
        {isEditing ? (
          <EditOfferForm offer={offer} setIsEditing={setIsEditing} />
        ) : (
          <div className="max-w-3xl">
            <div className="relative h-64 w-full max-w-xl mb-4">
              <Image
                src={currentImage || "/images/no-image.jpeg"}
                alt={offer.offerName}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex space-x-2 mb-4">
              {offer.mainImage && (
                <div className="w-16 h-16 relative cursor-pointer" onClick={() => handleImageClick(offer.mainImage.url)}>
                  <Image
                    src={offer.mainImage.url}
                    alt="Main Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
              {offer.image2 && (
                <div className="w-16 h-16 relative cursor-pointer" onClick={() => handleImageClick(offer.image2.url)}>
                  <Image
                    src={offer.image2.url}
                    alt="Image 2"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
              {offer.image3 && (
                <div className="w-16 h-16 relative cursor-pointer" onClick={() => handleImageClick(offer.image3.url)}>
                  <Image
                    src={offer.image3.url}
                    alt="Image 3"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
              {offer.image4 && (
                <div className="w-16 h-16 relative cursor-pointer" onClick={() => handleImageClick(offer.image4.url)}>
                  <Image
                    src={offer.image4.url}
                    alt="Image 4"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
              {offer.image5 && (
                <div className="w-16 h-16 relative cursor-pointer" onClick={() => handleImageClick(offer.image5.url)}>
                  <Image
                    src={offer.image5.url}
                    alt="Image 5"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold mt-4">{offer.offerName}</h1>
            <p className="text-lg mt-2">
              <span className="line-through">${offer.originalPrice.toFixed(2)}</span>{' '}
              <span className="text-red-500">
                ${offer.discountType === 'fixed' 
                  ? (offer.originalPrice - offer.discountValue).toFixed(2)
                  : (offer.originalPrice * (1 - offer.discountValue / 100)).toFixed(2)
                }
              </span>
            </p>
            <p className="text-green-600 font-bold mt-1">
              {offer.discountType === 'fixed' 
                ? `SAVE $${offer.discountValue.toFixed(2)}`
                : `${offer.discountValue}% OFF`
              }
            </p>
            <p className="mt-4">{offer.offerDescription}</p>
            <p className="mt-4"><strong>Usage Cycles:</strong> {offer.usageCycles}</p>
            <p className="mt-4"><strong>Usage Limit Per Cycle:</strong> {offer.usageLimitPerCycle}</p>
            <p className="mt-4"><strong>Terms and Conditions:</strong> {offer.termsAndConditions}</p>
            <p className="mt-4"><strong>Locations: </strong>
              {offer.vendor_locations.map(location => location.locationName).join(', ')}
            </p>
          </div>
        )}
        <BackButton onClick={() => router.push("/offers")}>
          Back to Offers
        </BackButton>
      </div>
    </ProtectedRoute>
  );
};

export default OfferDetailsPage;
