"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const getLinkClass = (path) => {
    return pathname === path
      ? "text-red-500 px-3 py-2 rounded-md text-md font-medium relative"
      : "text-black hover:bg-gray-200 px-3 py-2 rounded-md text-md font-medium";
  };

  return (
    <footer className="md:px-28 py-16 bg-gray-100">
      <div className="flex items-center justify-center pb-8">
        <Link href="/" className={getLinkClass("/")}>Home</Link>
        <Link href="/podcasts" className={getLinkClass("/podcasts")}>Podcasts</Link>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
        <Link href="/contact" className={getLinkClass("/contact")}>Contact Us</Link>
        <Link href="/login" className={getLinkClass("/login")}>Login</Link>
      </div>
      <div className="flex flex-col md:flex-row justify-between px-4">
        <div className="flex space-x-1">
          <Link href="/terms-and-conditions" className="text-red-500">Terms & Conditions</Link>
          <span>|</span>
          <Link href="/privacy-policy" className="text-red-500">Privacy Policy</Link>
        </div>
        <div className="flex">
          <p className="text-black">Copyright © Social Bevy 2024 | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
