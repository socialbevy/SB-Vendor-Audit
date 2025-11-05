'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from '@/components/notifications/Snackbar';
import Image from 'next/legacy/image';
import { useDropzone } from 'react-dropzone';
import Spinner from '@/components/shared/Spinner';
import { useUser, useEditVendor } from '@/lib/auth/authConfig';
import { useQueryClient } from '@tanstack/react-query';

const validationSchema = yup.object({
  fName: yup.string().required('First Name is required'),
  lName: yup.string().required('Last Name is required'),
  businessName: yup.string().required('Business Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
});

const EditProfileForm = () => {
  const { data: vendor, isLoading: loadingVendor } = useUser({
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
  const queryClient = useQueryClient();
  const { mutate: editVendor, isLoading: updatingVendor } = useEditVendor();
  const showSnackbar = useSnackbar();
  const [profilePic, setProfilePic] = useState(null);

  const defaultProfilePic = vendor?.logo?.url;

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fName: vendor?.fName || '',
      lName: vendor?.lName || '',
      businessName: vendor?.businessName || '',
      email: vendor?.email || '',
      phoneNumber: vendor?.phoneNumber || '',
    },
  });

  const { handleSubmit, formState, setValue, reset, control } = formMethods;

  const onSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    if (profilePic) {
      formData.append('file', profilePic);
    }
    editVendor({ id: vendor?.id, formData });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfilePic(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (loadingVendor) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col max-w-2xl">
      <div {...getRootProps()} className="relative w-32 h-32 mb-8 rounded-full bg-gray-200">
        <input {...getInputProps()} />
        <Image
          src={profilePic ? URL.createObjectURL(profilePic) : defaultProfilePic ? defaultProfilePic : '/images/bee.png'}
          alt="Profile Picture"
          layout="fill"
          className="rounded-full object-cover"
        />
        <Image
          src="/images/camera-icon.png"
          alt="Upload Icon"
          width={40}
          height={40}
          className="absolute bottom-0 right-0 cursor-pointer"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="fName" className="block text-sm font-medium text-gray-700">First Name</label>
            <Controller
              name="fName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="fName"
                  className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                  placeholder="ex: Alex"
                />
              )}
            />
            {formState.errors.fName && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formState.errors.fName.message}</div>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="lName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <Controller
              name="lName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="lName"
                  className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                  placeholder="ex: Smith"
                />
              )}
            />
            {formState.errors.lName && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formState.errors.lName.message}</div>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
          <Controller
            name="businessName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="businessName"
                className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                placeholder="ex: Company LLC"
              />
            )}
          />
          {formState.errors.businessName && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formState.errors.businessName.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                placeholder="ex: abc@gmail.com"
              />
            )}
          />
          {formState.errors.email && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formState.errors.email.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="phoneNumber"
                className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
                placeholder="ex: 5556667777"
              />
            )}
          />
          {formState.errors.phoneNumber && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{formState.errors.phoneNumber.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          disabled={updatingVendor}
        >
          {updatingVendor ? <Spinner /> : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
