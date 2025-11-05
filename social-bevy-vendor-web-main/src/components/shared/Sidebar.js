'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/legacy/image';
import Link from 'next/link';
import {
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  MicrophoneIcon,
  EnvelopeIcon,
  TagIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useUser } from '@/lib/auth/authConfig';
import { useLogout } from '@/lib/auth/authConfig';

const Sidebar = () => {
  const { data: vendor } = useUser({
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      router.push('/');
    },
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!vendor) return null;

  const handleLogout = () => {
    logout();
  };

  const getLinkClass = (path) => {
    return pathname === path
      ? 'bg-red-100 hover:text-red-500 flex items-center rounded-md px-4 py-2'
      : 'text-gray-800 hover:text-red-500 flex items-center px-4 py-2';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen bg-gray-100 p-4 sticky top-0 min-w-max border-r border-gray-200">
        <div
          className={`flex flex-col items-center justify-between mb-8 px-2 py-2 bg-white rounded-lg shadow-md transition-all duration-300 ${
            isExpanded ? 'h-auto' : 'h-16'
          }`}
        >
          <div className="flex items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <Image
              src={vendor?.logo?.url || '/images/bee.png'}
              alt="Company Logo"
              width={40}
              height={40}
              objectFit="cover"
              objectPosition="center"
              className="rounded-full"
            />
            <div className="ml-2">
              <div className="text-md font-medium text-black overflow-hidden w-36 truncate">{`${vendor.fName} ${vendor.lName}`}</div>
              <div className="text-sm font-medium text-gray-400 overflow-hidden w-36 truncate">{vendor?.businessName || 'Business Name'}</div>
            </div>
            <ChevronDownIcon className={`h-5 w-5 ml-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
          {isExpanded && (
            <div className="mt-4 space-y-2 w-full">
              <Link href="/settings/profile" className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-500 flex items-center rounded-md">
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Account Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-500 flex items-center rounded-md"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className={getLinkClass('/')}>
            <HomeIcon className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link href="/offers" className={getLinkClass('/offers')}>
            <TagIcon className="h-5 w-5 mr-2" />
            Offers
          </Link>
          {/* <Link href="/customers" className={getLinkClass('/customers')}>
            <UserGroupIcon className="h-5 w-5 mr-2" />
            Customers
          </Link> */}
          <hr className="my-4 border-t border-gray-300" />
          <Link href="/marketplace" className={getLinkClass('/marketplace')}>
            <ShoppingBagIcon className="h-5 w-5 mr-2" />
            Marketplace
          </Link>
          <Link href="/podcasts" className={getLinkClass('/podcasts')}>
            <MicrophoneIcon className="h-5 w-5 mr-2" />
            Podcasts
          </Link>
          <Link href="/shop" className={getLinkClass('/shop')}>
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Bevy Shop
          </Link>
          <Link href="/contact" className={getLinkClass('/contact')}>
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between p-4 h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-2">
              <Image
                src={vendor?.logo?.url || '/images/bee.png'}
                alt="Company Logo"
                width={40}
                height={40}
                objectFit="cover"
                objectPosition="center"
                className="rounded-full"
              />
            </Link>
            <div>
              <div className="text-md font-medium text-black overflow-hidden w-60 truncate">{`${vendor.fName} ${vendor.lName}`}</div>
              <div className="text-sm font-medium text-gray-400 overflow-hidden w-60 truncate">{vendor?.businessName || 'Business Name'}</div>
            </div>
          </div>
          <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-red-500 hover:text-red-900 focus:outline-none">
            <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="bg-gray-100 p-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className={getLinkClass('/')} onClick={toggleMenu}>
                <HomeIcon className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link href="/offers" className={getLinkClass('/offers')} onClick={toggleMenu}>
                <TagIcon className="h-5 w-5 mr-2" />
                Offers
              </Link>
              {/* <Link href="/customers" className={getLinkClass('/customers')} onClick={toggleMenu}>
                <UserGroupIcon className="h-5 w-5 mr-2" />
                Customers
              </Link> */}
              <hr className="my-4 border-t border-gray-300" />
              <Link href="/marketplace" className={getLinkClass('/marketplace')} onClick={toggleMenu}>
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Marketplace
              </Link>
              <Link href="/podcasts" className={getLinkClass('/podcasts')} onClick={toggleMenu}>
                <MicrophoneIcon className="h-5 w-5 mr-2" />
                Podcasts
              </Link>
              <Link href="/shop" className={getLinkClass('/shop')} onClick={toggleMenu}>
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Bevy Shop
              </Link>
              <hr className="my-4 border-t border-gray-300" />
              <Link href="/contact" className={getLinkClass('/contact')} onClick={toggleMenu}>
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Contact Us
              </Link>
              <Link href="/settings" className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center rounded-md" onClick={toggleMenu}>
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Account Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center rounded-md"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
