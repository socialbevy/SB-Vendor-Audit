'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/legacy/image';
import { useDropzone } from 'react-dropzone';
import Spinner from '../shared/Spinner';
import { useRegister } from '@/lib/auth/authConfig';
import { useSnackbar } from '@/components/notifications/Snackbar';

const validationSchema = yup.object({
  fName: yup.string().required('First Name is required'),
  lName: yup.string().required('Last Name is required'),
  businessName: yup.string().required('Business Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  password: yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms & Privacy Policy'),
});

const SignupForm = ({ router }) => {
  const { mutate: signup, isLoading } = useRegister();
  const showSnackbar = useSnackbar();
  const [profilePic, setProfilePic] = useState(null);
  
  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    if (profilePic) {
      formData.append('file', profilePic);
    }
    
    signup(formData, {
      onSuccess: () => {
        reset();
        setProfilePic(null);
        router.push('/');
      },
      onError: (error) => {
        showSnackbar(error.response?.data?.message || 'Signup failed', 'error');
      }
    });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfilePic(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-red-500 font-semibold mb-2">Upload A Company Logo</h3>
      <div {...getRootProps()} className="relative w-32 h-32 mb-8 rounded-full bg-gray-200">
        <input {...getInputProps()} />
        <Image
          src={profilePic ? URL.createObjectURL(profilePic) : '/images/bee.png'}
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
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="fName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="fName"
              id="fName"
              {...register('fName')}
              className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
              placeholder="ex: Alex"
            />
            {errors.fName && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.fName.message}</div>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="lName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lName"
              id="lName"
              {...register('lName')}
              className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
              placeholder="ex: Smith"
            />
            {errors.lName && (
              <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.lName.message}</div>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            name="businessName"
            id="businessName"
            {...register('businessName')}
            className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
            placeholder="ex: Company LLC"
          />
          {errors.businessName && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.businessName.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
            placeholder="ex: abc@gmail.com"
          />
          {errors.email && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.email.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            {...register('phoneNumber')}
            className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
            placeholder="ex: 5556667777"
          />
          {errors.phoneNumber && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.phoneNumber.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register('password')}
            className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
            placeholder="ex: password123"
          />
          {errors.password && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.password.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            {...register('confirmPassword')}
            className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
            placeholder="ex: password123"
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-xs mt-1 mb-4 ml-1 min-h-[1rem]">{errors.confirmPassword.message}</div>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            {...register('acceptTerms')}
            className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
            I agree to the{' '}
            <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-red-500 underline">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-red-500 underline">
              Privacy Policy
            </a>.
          </label>
        </div>
        {errors.acceptTerms && (
          <div className="text-red-500 text-xs my-2 ml-1 min-h-[1rem]">{errors.acceptTerms.message}</div>
        )}
        <div class="h-2"></div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Continue'}
        </button>
      </form>
      <p className="mt-6 text-gray-700 text-sm">
        Already have an account? <a href="/login" className="text-red-500 hover:text-red-600">Login</a>
      </p>
    </div>
  );
};

export default SignupForm;
