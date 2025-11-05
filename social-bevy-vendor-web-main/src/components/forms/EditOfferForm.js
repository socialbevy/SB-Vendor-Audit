import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useEditOffer } from '@/lib/features/offers/useOffers';
import { useVendorLocations } from '@/lib/features/vendorLocations/useVendorLocations';
import ImageUpload from '../inputs/ImageUpload';
import Spinner from '@/components/shared/Spinner';
import { useSnackbar } from '@/components/notifications/Snackbar';

const validationSchema = yup.object({
  offerName: yup.string().required('Offer name is required'),
  offerDescription: yup.string().required('Offer description is required'),
  originalPrice: yup.number().required('Original price is required'),
  discountType: yup.string().oneOf(['fixed', 'percentage']).required('Discount type is required'),
  discountValue: yup.number().required('Discount value is required')
    .when('discountType', {
      is: 'percentage',
      then: (schema) => schema.min(0, 'Percentage must be positive').max(100, 'Percentage cannot exceed 100'),
      otherwise: (schema) => schema.min(0, 'Discount amount must be positive')
    }),
  usageCycles: yup.object().required('Usage cycles are required').nullable(),
  usageLimitPerCycle: yup.number().required('Usage limit per cycle is required'),
  termsAndConditions: yup.string().required('Terms and conditions are required'),
});

const EditOfferForm = ({ offer, setIsEditing }) => {
  const showSnackbar = useSnackbar();
  const { mutate: editOffer, isLoading: updatingOffer, error: editError } = useEditOffer();
  const { data: vendorLocations } = useVendorLocations(offer.vendor_id)
  const [images, setImages] = useState([null, null, null, null, null]);

  const animatedComponents = makeAnimated();

  useEffect(() => {
    if (offer) {
      setImages([
        offer.mainImage || null,
        offer.image2 || null,
        offer.image3 || null,
        offer.image4 || null,
        offer.image5 || null
      ]);
    }
  }, [offer]);

  const locationOptions = vendorLocations?.map(location => ({ value: location.id, label: location.locationName })) || [];
  const usageCycleOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Yearly', label: 'Yearly' },
    { value: 'Weekly', label: 'Weekly' },
  ];

  const discountTypeOptions = [
    { value: 'fixed', label: 'Fixed Amount Off' },
    { value: 'percentage', label: 'Percentage Off' },
  ];

  const { handleSubmit, control, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      offerName: offer?.offerName || '',
      offerDescription: offer?.offerDescription || '',
      originalPrice: offer?.originalPrice || '',
      discountType: offer?.discountType || 'fixed',
      discountValue: offer?.discountValue || '',
      usageCycles: offer?.usageCycles ? { value: offer.usageCycles, label: offer.usageCycles } : null,
      usageLimitPerCycle: offer?.usageLimitPerCycle || '',
      termsAndConditions: offer?.termsAndConditions || '',
      vendor_id: offer.vendor_id,
      vendor_location_ids: offer.vendor_locations?.map(location => ({ value: location.id, label: location.locationName })) || [],
    },
  });

  const discountType = watch('discountType');

  const onSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === 'vendor_location_ids') {
        const locationIds = values[key].map(location => location.value);
        formData.append(key, JSON.stringify(locationIds));
      } else if (key === 'usageCycles') {
        formData.append(key, values[key].value);
      } else {
        formData.append(key, values[key]);
      }
    }
    images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`file${index + 1}`, image);
      }
    });
    editOffer({ offerId: offer.id, offerData: formData }, {
      onSuccess: () => {
        reset();
        setImages([null, null, null, null, null]);
        showSnackbar("Offer updated successfully!", 'success');
        setIsEditing(false);
      },
      onError: (error) => {
        showSnackbar(error.message, 'error');
      },
    });
  };

  const handleDrop = useCallback((acceptedFiles, index) => {
    const newImages = [...images];
    newImages[index] = acceptedFiles[0];
    setImages(newImages);
  }, [images]);

  return (
    <div className="flex flex-col w-full max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="offerName" className="block text-sm font-medium text-gray-700">Offer Name</label>
            <Controller
              name="offerName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="offerName"
                  className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                  placeholder="Enter offer name"
                />
              )}
            />
            {errors.offerName && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.offerName.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Original Price</label>
            <Controller
              name="originalPrice"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="originalPrice"
                  className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                  placeholder="Enter original price"
                />
              )}
            />
            {errors.originalPrice && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.originalPrice.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">Discount Type</label>
            <Controller
              name="discountType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={discountTypeOptions.find(option => option.value === field.value)}
                  onChange={(option) => field.onChange(option.value)}
                  components={animatedComponents}
                  options={discountTypeOptions}
                  className="mt-1"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.discountType && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.discountType.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
              {discountType === 'percentage' ? 'Percentage Off' : 'Amount Off'}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <Controller
                name="discountValue"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="discountValue"
                    className="block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                    placeholder={discountType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                  />
                )}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  {discountType === 'percentage' ? '%' : '$'}
                </span>
              </div>
            </div>
            {errors.discountValue && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.discountValue.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="usageCycles" className="block text-sm font-medium text-gray-700">Usage Cycles</label>
            <Controller
              name="usageCycles"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  components={animatedComponents}
                  options={usageCycleOptions}
                  className="mt-1"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.usageCycles && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.usageCycles.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="usageLimitPerCycle" className="block text-sm font-medium text-gray-700">Usage Limit Per Cycle</label>
            <Controller
              name="usageLimitPerCycle"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="usageLimitPerCycle"
                  className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                  placeholder="Enter usage limit per cycle"
                />
              )}
            />
            {errors.usageLimitPerCycle && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.usageLimitPerCycle.message}</div>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="offerDescription" className="block text-sm font-medium text-gray-700">Offer Description</label>
          <Controller
            name="offerDescription"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="offerDescription"
                className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                placeholder="Enter offer description"
                rows="3"
              />
            )}
          />
          {errors.offerDescription && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.offerDescription.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="vendor_location_ids" className="block text-sm font-medium text-gray-700">Locations</label>
          <Controller
            name="vendor_location_ids"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                components={animatedComponents}
                options={locationOptions}
                className="mt-1"
                classNamePrefix="select"
              />
            )}
          />
          {errors.vendor_location_ids && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.vendor_location_ids.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700">Terms and Conditions</label>
          <Controller
            name="termsAndConditions"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="termsAndConditions"
                className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                placeholder="Enter terms and conditions"
                rows="3"
              />
            )}
          />
          {errors.termsAndConditions && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.termsAndConditions.message}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <div className="flex flex-wrap gap-4 mb-8">
            {[0, 1, 2, 3, 4].map((index) => (
              <ImageUpload
                key={index}
                index={index}
                image={images[index]}
                handleDrop={handleDrop}
                defaultImage={images[index]?.url}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          disabled={updatingOffer}
        >
          {updatingOffer ? <Spinner /> : 'Save Offer'}
        </button>
        {editError ? (
          <div className="text-red-500 text-sm mt-2 min-h-[1.5rem]">{editError.message}</div>
        ) : (
          <div className="mt-2 min-h-[1.5rem]" />
        )}
      </form>
    </div>
  );
};

export default EditOfferForm;
