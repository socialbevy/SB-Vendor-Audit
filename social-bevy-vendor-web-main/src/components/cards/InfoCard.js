import React from 'react';
import ubuntu from '@/utils/ubuntu';

const InfoCard = ({ title, body, Icon }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <div className="text-red-500 mb-4">
        {Icon && <Icon className="w-12 h-12" />}
      </div>
      <h3 className={`text-xl font-bold mb-2 ${ubuntu.className}`}>{title}</h3>
      <p className="text-gray-700 text-center">
        {body}
      </p>
    </div>
  );
};

export default InfoCard;
