import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md animate-pulse">
      <div className="relative w-full pb-56 bg-gray-200 rounded-t-lg"></div>
      <div className="flex flex-col items-start mt-4 space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;