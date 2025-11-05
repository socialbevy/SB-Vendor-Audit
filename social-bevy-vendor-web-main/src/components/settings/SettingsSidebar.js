"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircleIcon, CreditCardIcon, MapPinIcon } from '@heroicons/react/24/outline';

const SettingsSidebar = () => {
  const pathname = usePathname();

  const getLinkClass = (path) => {
    return pathname === path
      ? 'bg-red-100 text-red-500 flex items-center rounded-md px-4 py-2'
      : 'text-gray-800 hover:text-red-500 flex items-center px-4 py-2';
  };

  return (
    <div className="hidden md:flex flex-col h-screen bg-white p-4 sticky top-0 min-w-[272px] border-r border-gray-200">
      <nav className="flex flex-col space-y-4">
        <Link href="/settings/profile" className={getLinkClass('/settings/profile')}>
          <UserCircleIcon className="h-5 w-5 mr-2" />
          Profile
        </Link>
        <Link href="/settings/subscription" className={getLinkClass('/settings/subscription')}>
          <CreditCardIcon className="h-5 w-5 mr-2" />
          Subscription
        </Link>
        <Link href="/settings/locations" className={getLinkClass('/settings/locations')}>
          <MapPinIcon className="h-5 w-5 mr-2" />
          Locations
        </Link>
      </nav>
    </div>
  );
};

export default SettingsSidebar;
