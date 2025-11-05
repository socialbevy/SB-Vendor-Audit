'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm as useFormspree } from '@formspree/react';
import { useUser } from '@/lib/auth/authConfig';
import { ValidationError } from '@formspree/react';
import ubuntu from '@/utils/ubuntu';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').max(500, 'Message must be at most 500 characters'),
});

const ContactPage = () => {
  const { data: vendor } = useUser({
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
  const [state, handleSubmitFormspree] = useFormspree("xgegqqzp");

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { handleSubmit, register, formState: { errors }, reset, watch } = formMethods;
  const messageLength = watch('message')?.length || 0;

  const onSubmit = async (values) => {
    const response = await handleSubmitFormspree(values);
    if (response.succeeded) {
      reset();
    }
  };

  if (state.succeeded) {
    return (
      <div className={`min-h-[calc(100vh-314px)] bg-gray-100 px-4 py-12 flex flex-col items-center ${vendor ? "mt-20 md:mt-0" : ""}`}>
        <div className="max-w-2xl w-full bg-white rounded-lg p-8 shadow-lg">
          <p className="text-lg text-gray-700 text-center">Thanks for your message! We will get back to you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-[calc(100vh-314px)] bg-white px-4 py-12 flex flex-col items-center ${vendor ? "mt-20 md:mt-0" : ""}`}>
      <h2 className={`text-4xl font-extrabold text-black text-center mb-4 ${ubuntu.className}`}>
        We’d love to hear from you.
      </h2>
      <p className="text-gray-700 text-center mb-8">Contact us regarding any concerns or inquiries.</p>
      <div className="max-w-2xl w-full bg-white rounded-lg p-8 md:shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name')}
                type="text"
                id="name"
                placeholder="Enter name"
                className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
              />
              {errors.name && (
                <div className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</div>
              )}
              <ValidationError prefix="Name" field="name" errors={state.errors} className="form-error" />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="Enter email"
                className="mt-1 block w-full rounded-md bg-white text-gray-800 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
              />
              {errors.email && (
                <div className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</div>
              )}
              <ValidationError prefix="Email" field="email" errors={state.errors} className="form-error" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              {...register('subject')}
              type="text"
              id="subject"
              placeholder="Enter subject"
              className="mt-1 block w-full rounded-md bg-white text-gray-700 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
            />
            {errors.subject && (
              <div className="text-red-500 text-xs mt-1 ml-1">{errors.subject.message}</div>
            )}
            <ValidationError prefix="Subject" field="subject" errors={state.errors} className="form-error" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              {...register('message')}
              id="message"
              placeholder="What’s on your mind?"
              rows="6"
              className="mt-1 block w-full rounded-md bg-white text-gray-700 border border-gray-300 focus:ring-red-500 focus:border-red-500 px-3 py-2"
            ></textarea>
            {errors.message && (
              <div className="text-red-500 text-xs mt-1 ml-1">{errors.message.message}</div>
            )}
            <ValidationError prefix="Message" field="message" errors={state.errors} className="form-error" />
            <div className="text-gray-400 text-sm text-right mt-2">{messageLength}/500</div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-red-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
