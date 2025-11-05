"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { loadStripe } from '@stripe/stripe-js';
import BackButton from "@/components/buttons/BackButton";
import { useUser } from "@/lib/auth/authConfig";
import { useSnackbar } from '@/components/notifications/Snackbar';
import ubuntu from '@/utils/ubuntu';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const SubscriptionPage = () => {
  const { data: vendor } = useUser({
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.push('/settings');
  };

  const createCustomerPortalSession = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}stripe/customer-portal/sessions`, {
        customer: vendor.stripeCustomerId,
        return_url: window.location.origin + '/settings/subscription'
      });

      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      showSnackbar('Failed to create customer portal session', 'error');
      setLoading(false);
    }
  };

  const createCheckoutSession = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}stripe/checkout/sessions`, {
        mode: 'subscription',
        customer: vendor.stripeCustomerId,
        line_items: [
          {
            price: 'price_1PCARpGVbCoDzvPB2hWl8P9F',
            quantity: 1,
          },
          {
            price: 'price_1PCAR3GVbCoDzvPBPi8u47CR',
            quantity: 1,
          }
        ],
        subscription_data: {
          trial_period_days: 90,
        },
        success_url: window.location.origin + '/success',
        cancel_url: window.location.origin + '/settings/subscription',
      });

      const { id: sessionId } = response.data;
      return sessionId;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      showSnackbar('Failed to create checkout session', 'error');
      throw error;
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const sessionId = await createCheckoutSession();

    if (sessionId) {
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Error redirecting to checkout:', error);
        showSnackbar('Failed to redirect to checkout', 'error');
        setLoading(false);
      }
    }
  };

  return (
    <div className="mt-16 md:mt-0">
      <div className="border-b border-gray-300 md:hidden">
        <BackButton onClick={handleBack}>Back</BackButton>
      </div>
      <div className="p-2 md:p-4">
        <h1 className={`text-2xl font-bold md:px-0 md:mb-4 ${ubuntu.className}`}>Subscription</h1>
        <p>Current Subscription: {vendor?.membershipPlan || "Soci-Data Free"}</p>
        {vendor?.membershipPlan === "Soci-Data Free" || !vendor?.membershipPlan ? (
          <button 
            onClick={handleCheckout} 
            className="text-blue-500"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Subscribe'}
          </button>
        ) : (
          <button 
            onClick={createCustomerPortalSession} 
            className="text-blue-500"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Manage Subscription'} 
          </button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
