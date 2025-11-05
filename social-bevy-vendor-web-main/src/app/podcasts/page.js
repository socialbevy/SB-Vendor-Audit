'use client';

import React from 'react';
import { useUser } from '@/lib/auth/authConfig';
import usePodcasts from '@/lib/features/podcasts/usePodcasts';
import PodcastCard from '@/components/cards/PodcastCard';
import SkeletonCard from '@/components/cards/SkeletonCard';
import ubuntu from '@/utils/ubuntu';

const PodcastsPage = () => {
  const { data: vendor } = useUser({
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });
  const { data: podcasts, status, error } = usePodcasts();

  return (
    <div>
      {vendor && (
        <h1 className={`md:flex text-2xl font-semibold p-4 bg-white md:border-b border-gray-200 ${ubuntu.className}`}>
          Podcasts
        </h1>
      )}
      <div className={`relative w-full px-6 md:px-8 py-12 bg-gray-100 ${vendor && "mt-20 md:mt-0"}`}>
        {!vendor && (
          <h2 className={`text-4xl font-extrabold text-gray-900 text-center mb-8 ${ubuntu.className}`}>Podcasts</h2>
        )}

        {status === 'pending' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500 text-center">Error: {error.message}</div>
        )}
        {status === 'success' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts && podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastsPage;
