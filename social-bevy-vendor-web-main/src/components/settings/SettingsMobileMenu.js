"use client"

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ubuntu from '@/utils/ubuntu';

const SettingsMobileMenu = () => {

  return (
    <div className="md:hidden min-h-[calc(100vh-160px)] mt-20 bg-white">
      <div className="flex items-center">
        <h1 className={`text-2xl font-semibold ${ubuntu.className}`}>Settings</h1>
      </div>
      <div className="flex flex-col py-4 space-y-4">
        <Link 
          href="/settings/profile" 
          className="w-full flex text-xl items-center justify-between text-left px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-red-500 rounded"
        >
          Profile
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
        <Link
          href="/settings/subscription"
          className="w-full flex items-center text-xl justify-between text-left px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-red-500 rounded"
        >
          Subscription
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
        <Link
          href="/settings/locations"
          className="w-full flex items-center justify-between text-xl text-left px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-red-500 rounded"
        >
          Locations
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default SettingsMobileMenu;
