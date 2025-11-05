import React from 'react';
import Image from 'next/image';
import { UserIcon, ChartBarSquareIcon, UsersIcon, TagIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';
import InfoCard from '../cards/InfoCard';
import ubuntu from '@/utils/ubuntu';

const Section2 = () => {
  return (
    <section className="relative w-full py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-extrabold text-gray-900 uppercase ${ubuntu.className}`}>How Social Bevy Works For You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white justify-center rounded-lg shadow-md">
            <Image
              src="/images/bee2.png"
              alt="Bevy Bee"
              width={100}
              height={100}
              className="mb-4 md:mb-0 animate-bounce"
            />
            <h3 className={`text-2xl font-bold mb-2 ${ubuntu.className}`}>Let’s Bee..gin!</h3>
          </div>
          <InfoCard
            title="CREATE YOUR ACCOUNT"
            body="Start buzzing with success in just a few clicks! Provide your basic details, access a thriving community, and endless opportunities to showcase your offerings."
            Icon={UserIcon}
          />
          <InfoCard
            title="ACCESS YOUR DASHBOARD"
            body="Access your vendor dashboard for a personalized experience. Track your offers and customer data within the Social Bevy community."
            Icon={ChartBarSquareIcon}
          />
          <InfoCard
            title="CONNECT WITH USERS"
            body="As users utilize your deals, you get insight and data to help keep you connected to your target customer base."
            Icon={UsersIcon}
          />
          <InfoCard
            title="CREATE COUPONS & DEALS"
            body="Create deals and offers that draw in customers to specific products or services that your business offers."
            Icon={TagIcon}
          />
          <InfoCard
            title="SALES & GROWTH INCREASE"
            body="Watch sales increase from exposure to the Social Bevy community as well as traffic drawn from your offers."
            Icon={PresentationChartLineIcon}
          />
        </div>
      </div>
    </section>
  );
};

export default Section2;
