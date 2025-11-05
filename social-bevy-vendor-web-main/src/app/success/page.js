"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { useSnackbar } from '@/components/notifications/Snackbar';

const SuccessPage = () => {
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const hasShownSnackbar = useRef(false);

  useEffect(() => {
    if (!hasShownSnackbar.current) {
      showSnackbar('Update subscription successfully!', 'success');
      hasShownSnackbar.current = true;
    }

    const timer = setTimeout(() => {
      console.log("Redirecting to /settings/subscription");
      router.push('/settings/subscription');
    }, 3000);

    return () => {
      console.log("Clearing timeout");
      clearTimeout(timer);
    };
  }, [router, showSnackbar]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
};

export default SuccessPage;
