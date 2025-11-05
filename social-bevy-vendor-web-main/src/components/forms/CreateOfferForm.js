import React, { useState, useCallback } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { PlusIcon } from '@heroicons/react/24/outline';
import FormDrawer from '@/components/drawers/FormDrawer';
import ImageUpload from '@/components/inputs/ImageUpload';
import { useSnackbar } from '@/components/notifications/Snackbar';
import { useCreateOffer } from '@/lib/features/offers/useOffers';
import { useVendorLocations } from '@/lib/features/vendorLocations/useVendorLocations';

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
  usageCycles: yup.string().required('Usage cycles are required'),
  usageLimitPerCycle: yup.number().required('Usage limit per cycle is required'),
  termsAndConditions: yup.string().required('Terms and conditions are required'),
});

const CreateOfferForm = ({ vendorId, isOpen }) => {
  const showSnackbar = useSnackbar();
  const createOffer = useCreateOffer();
  const { data: vendorLocations } = useVendorLocations(vendorId);
  const [images, setImages] = useState([null, null, null, null, null]);

  const animatedComponents = makeAnimated();

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

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      offerName: '',
      offerDescription: '',
      originalPrice: '',
      discountType: 'fixed',
      discountValue: '',
      usageCycles: '',
      usageLimitPerCycle: '',
      termsAndConditions: '',
      vendor_id: vendorId,
      vendor_location_ids: [],
    },
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === 'vendor_location_ids') {
        const locationIds = values[key].map(location => location.value);
        formData.append(key, JSON.stringify(locationIds));
      } else {
        formData.append(key, values[key]);
      }
    }
    images.forEach((image, index) => {
      if (image) {
        formData.append(`file${index + 1}`, image);
      }
    });
    createOffer.mutate(formData, {
      onSuccess: () => {
        formMethods.reset();
        setImages([null, null, null, null, null]);
        showSnackbar("Created offer successfully!", 'success');
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

  const triggerButton = (
    <button type="button" className="btn">
      <PlusIcon className="w-8 h-8 text-bold text-red-500" />
    </button>
  );

  const submitButton = (
    <button
      form="create-offer-form"
      type="submit"
      className="py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      disabled={createOffer.isLoading}
    >
      Create Offer
    </button>
  );

  const discountType = formMethods.watch('discountType');

  return (
    <>
      <FormDrawer
        isDone={createOffer.isSuccess}
        triggerButton={triggerButton}
        submitButton={submitButton}
        title="Create New Offer"
        defaultOpen={isOpen}
      >
        <FormProvider {...formMethods}>
          <form id="create-offer-form" onSubmit={formMethods.handleSubmit(onSubmit)} className="w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="offerName" className="block text-sm font-medium text-gray-700">Offer Name</label>
                <input
                  {...formMethods.register('offerName')}
                  type="text"
                  id="offerName"
                  className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                  placeholder="Enter offer name"
                />
                {formMethods.formState.errors.offerName && (
                  <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formMethods.formState.errors.offerName.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Original Price</label>
                <input
                  {...formMethods.register('originalPrice')}
                  type="number"
                  id="originalPrice"
                  className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                  placeholder="Enter original price"
                />
                {formMethods.formState.errors.originalPrice && (
                  <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formMethods.formState.errors.originalPrice.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">Discount Type</label>
                <Controller
                  name="discountType"
                  control={formMethods.control}
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
                {formMethods.formState.errors.discountType && (
                  <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formMethods.formState.errors.discountType.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
                  {discountType === 'percentage' ? 'Percentage Off' : 'Amount Off'}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    {...formMethods.register('discountValue')}
                    type="number"
                    id="discountValue"
                    className="block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                    placeholder={discountType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      {discountType === 'percentage' ? '%' : '$'}
                    </span>
                  </div>
                </div>
                {formMethods.formState.errors.discountValue && (
                  <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formMethods.formState.errors.discountValue.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="usageCycles" className="block text-sm font-medium text-gray-700">Usage Cycles</label>
                <Controller
                  name="usageCycles"
                  control={formMethods.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={usageCycleOptions.find(option => option.value === field.value)}
                      onChange={(option) => field.onChange(option.value)}
                      components={animatedComponents}
                      options={usageCycleOptions}
                      className="mt-1"
                      classNamePrefix="select"
                    />
                  )}
                />
                {formMethods.formState.errors.usageCycles && (
                  <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formMethods.formState.errors.usageCycles.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="usageLimitPerCycle" className="block text-sm font-medium text-gray-700">Usage Limit Per Cycle</label>
                <input
                  {...formMethods.register('usageLimitPerCycle')}
                  type="number"
                  id="usageLimitPerCycle"
                  className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                  placeholder="Enter usage limit per cycle"
                />
                {formMethods.formState.errors.usageLimitPerCycle && (
                  <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formMethods.formState.errors.usageLimitPerCycle.message}</div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="offerDescription" className="block text-sm font-medium text-gray-700">Offer Description</label>
              <textarea
                {...formMethods.register('offerDescription')}
                id="offerDescription"
                className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                placeholder="Enter offer description"
                rows="3"
              />
              {formMethods.formState.errors.offerDescription && (
                <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formMethods.formState.errors.offerDescription.message}</div>
              )}
            </div>
            <div>
              <label htmlFor="vendor_location_ids" className="block text-sm font-medium text-gray-700">Locations</label>
              <Controller
                name="vendor_location_ids"
                control={formMethods.control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    components={animatedComponents}
                    options={locationOptions}
                    className="mt-1 cursor-pointer"
                    classNamePrefix="select"
                  />
                )}
              />
              {formMethods.formState.errors.vendor_location_ids && (
                <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formMethods.formState.errors.vendor_location_ids.message}</div>
              )}
            </div>
            <div>
              <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700">Terms and Conditions</label>
              <textarea
                {...formMethods.register('termsAndConditions')}
                id="termsAndConditions"
                className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                placeholder="Enter terms and conditions"
                rows="3"
              />
              {formMethods.formState.errors.termsAndConditions && (
                <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formMethods.formState.errors.termsAndConditions.message}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <div className="flex flex-wrap gap-4 mb-8">
                {[0, 1, 2, 3, 4].map((index) => (
                  <ImageUpload key={index} index={index} image={images[index]} handleDrop={handleDrop} />
                ))}
              </div>
            </div>
            {createOffer.error ? (
              <div className="text-red-500 text-sm mt-2 min-h-[1.5rem]">{createOffer.error.message}</div>
            ) : (
              <div className="mt-2 min-h-[1.5rem]" />
            )}
          </form>
        </FormProvider>
      </FormDrawer>
    </>
  );
};

export default CreateOfferForm;
