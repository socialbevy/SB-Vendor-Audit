'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import useScrollLock from '@/lib/hooks/useScrollLock';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useScrollLock(isOpen);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events?.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleLinkClick = (href) => {
    router.push(href);
    setIsOpen(false);
  };

  const getLinkClass = (path) => {
    return pathname === path
      ? 'text-red-500 px-3 py-2 rounded-md text-md font-medium relative active-link cursor-pointer'
      : 'text-black hover:bg-gray-200 px-3 py-2 rounded-md text-md font-medium cursor-pointer';
  };

  const getMenuLinkClass = (path) => {
    return pathname === path
      ? 'text-red-500 hover:bg-gray-200 px-3 py-2 rounded-md text-md font-medium relative'
      : 'text-black hover:bg-gray-200 px-3 py-2 rounded-md text-md font-medium';
  };

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex justify-between flex-grow">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className={getLinkClass('/')}>Home</Link>
              <Link href="/podcasts" className={getLinkClass('/podcasts')}>Podcasts</Link>
              <Link href="/contact" className={getLinkClass('/contact')}>Contact Us</Link>
            </div>
            <div className="flex items-center space-x-4">
              <>
                <button onClick={() => router.push('/signup')} className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Sign Up</button>
                <button onClick={() => router.push('/login')} className="bg-black text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Login</button>
              </>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden z-50">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-red-500 hover:text-red-900 focus:outline-none">
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-0 top-20 bg-white z-40 transition-transform duration-400 ease-in-out`}>
        <div className="pb-3 space-y-1 h-full flex flex-col justify-between">
          <div className="pt-16 px-4 space-y-1 flex-grow">
            <Link href="/" className={`${getMenuLinkClass('/')} block`} onClick={() => handleLinkClick('/')}>Home</Link>
            <Link href="/podcasts" className={`${getMenuLinkClass('/podcasts')} block`} onClick={() => handleLinkClick('/podcasts')}>Podcasts</Link>
            <Link href="/contact" className={`${getMenuLinkClass('/contact')} block`} onClick={() => handleLinkClick('/contact')}>Contact Us</Link>
            <div className="pt-8 space-y-4 w-full justify-center">
              <>
                <button onClick={() => handleLinkClick('/signup')} className="bg-red-500 text-white px-8 py-2 rounded-md text-sm font-medium w-full">Sign Up</button>
                <button onClick={() => handleLinkClick('/login')} className="bg-black text-white px-8 py-2 rounded-md text-sm font-medium w-full">Login</button>
              </>
            </div>
          </div>
          <div className="flex flex-col items-center pb-8 space-y-4">
            <div className="flex-shrink-0 animate-bounce">
              <Image
                src="/images/bee.png"
                alt="Bee"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
