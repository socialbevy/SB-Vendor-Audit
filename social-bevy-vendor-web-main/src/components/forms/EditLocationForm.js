import React, { useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEditLocation } from '@/lib/features/vendorLocations/useVendorLocations';
import FormDrawer from '../drawers/FormDrawer';
import { useSnackbar } from '@/components/notifications/Snackbar';

const validationSchema = yup.object({
  locationName: yup.string().required('Location name is required'),
  address1: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.number().required('Zip code is required'),
  restaurant: yup.boolean(),
  bar: yup.boolean(),
  lounge: yup.boolean(),
  service: yup.boolean(),
});

const EditLocationForm = ({ location }) => {
  const showSnackbar = useSnackbar();
  const { mutate: editLocation, isLoading, isSuccess } = useEditLocation();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      locationName: location.locationName,
      address1: location.address1,
      address2: location.address2,
      city: location.city,
      state: location.state,
      zipCode: location.zipCode,
      restaurant: location.restaurant,
      bar: location.bar,
      lounge: location.lounge,
      service: location.service,
    }
  });

  useEffect(() => {
    formMethods.reset({
      locationName: location.locationName,
      address1: location.address1,
      address2: location.address2,
      city: location.city,
      state: location.state,
      zipCode: location.zipCode,
      restaurant: location.restaurant,
      bar: location.bar,
      lounge: location.lounge,
      service: location.service,
    });
  }, [location, formMethods]);

  const onSubmit = (values) => {
    editLocation({ locationId: location.id, locationData: { ...values, vendor_id: location.vendor_id } }, {
      onSuccess: () => {
        formMethods.reset();
        showSnackbar('Location updated successfully!', 'success');
      },
      onError: (error) => {
        showSnackbar(error.message, 'error');
      }
    });
  };

  const triggerButton = (
    <button className="py-0.5 px-2 h-7 text-sm bg-white border text-black rounded-md hover:bg-gray-200">
      Edit
    </button>
  );

  const submitButton = (
    <button
      form="update-location-form"
      type="submit"
      className="py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      disabled={isLoading}
    >
      Update Location
    </button>
  );

  return (
    <FormDrawer
      isDone={isSuccess}
      triggerButton={triggerButton}
      submitButton={submitButton}
      title="Update Location"
    >
      <FormProvider {...formMethods}>
        <form id="update-location-form" onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">Location Name</label>
            <input
              {...formMethods.register('locationName')}
              type="text"
              id="locationName"
              className="mt-1 block w-full rounded-md bg-white border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
              placeholder="Enter location name"
            />
            {formMethods.formState.errors.locationName && (
              <div className="text-red-500 text-xs mt-1">{formMethods.formState.errors.locationName.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address 1</label>
            <input
              {...formMethods.register('address1')}
              type="text"
              id="address1"
              className="mt-1 block w-full rounded-md bg-white border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
              placeholder="Enter address line 1"
            />
            {formMethods.formState.errors.address1 && (
              <div className="text-red-500 text-xs mt-1">{formMethods.formState.errors.address1.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              {...formMethods.register('city')}
              type="text"
              id="city"
              className="mt-1 block w-full rounded-md bg-white border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
              placeholder="Enter city"
            />
            {formMethods.formState.errors.city && (
              <div className="text-red-500 text-xs mt-1">{formMethods.formState.errors.city.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              {...formMethods.register('state')}
              type="text"
              id="state"
              className="mt-1 block w-full rounded-md bg-white border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
              placeholder="Enter state"
            />
            {formMethods.formState.errors.state && (
              <div className="text-red-500 text-xs mt-1">{formMethods.formState.errors.state.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              {...formMethods.register('zipCode')}
              type="number"
              id="zipCode"
              className="mt-1 block w-full rounded-md bg-white border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
              placeholder="Enter zip code"
            />
            {formMethods.formState.errors.zipCode && (
              <div className="text-red-500 text-xs mt-1">{formMethods.formState.errors.zipCode.message}</div>
            )}
          </div>
          <div className="block text-sm font-medium text-gray-700">Type</div>
          <div className="flex items-center gap-4 mt-2">
            {['restaurant', 'bar', 'lounge', 'service'].map(type => (
              <div key={type}>
                <Controller
                  name={type}
                  control={formMethods.control}
                  defaultValue={location[type]} // Set default value directly
                  render={({ field }) => (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-red-500 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                        {...field}
                        checked={field.value} // Ensure checked reflects field value
                        onChange={(e) => field.onChange(e.target.checked)} // Handle onChange
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  )}
                />
              </div>
            ))}
          </div>
        </form>
      </FormProvider>
    </FormDrawer>
  );
};

export default EditLocationForm;
