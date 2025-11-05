"use client"

import { ProductBrowser } from '@ecwid/nextjs-ecwid-plugin';
import ubuntu from '@/utils/ubuntu';

const ShopPage = () => {
  return (
    <main>
      <h1 className={`md:flex text-2xl font-semibold p-4 bg-white md:border-b border-gray-200 ${ubuntu.className}`}>
        Bevy Shop
      </h1>
      <div className="p-8">
        <ProductBrowser storeId={process.env.NEXT_PUBLIC_ECWID_STORE_ID} />
      </div>
    </main>
  );
};

export default ShopPage;