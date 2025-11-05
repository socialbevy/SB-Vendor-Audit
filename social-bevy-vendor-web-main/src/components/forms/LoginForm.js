'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image';
import Spinner from '../shared/Spinner';
import { useLogin } from '@/lib/auth/authConfig';
import { useSnackbar } from '@/components/notifications/Snackbar';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = ({ router }) => {
  const { mutate: login, isLoading } = useLogin();
  const showSnackbar = useSnackbar();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    login(values, {
      onSuccess: () => {
        reset();
        router.push('/');
      },
      onError: (error) => {
        showSnackbar(error.response?.data?.message || 'Login failed', 'error');
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Image src="/images/logo.png" width={200} height={200} alt="Logo" className="mb-4" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
            placeholder="Enter email"
          />
          {errors.email && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.email.message}</div>
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
            placeholder="Enter password"
          />
          {errors.password && (
            <div className="text-red-500 text-xs mt-1 ml-1 min-h-[1rem]">{errors.password.message}</div>
          )}
        </div>
        <div className="flex justify-end">
          <a href="/forgot-password" className="text-sm text-red-500 hover:text-red-600 mb-4">Forgot Password</a>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Login'}
        </button>
      </form>
      <p className="mt-6 text-gray-700 text-sm">
        Don’t have an account? <a href="/signup" className="text-red-500 hover:text-red-600">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginForm;
