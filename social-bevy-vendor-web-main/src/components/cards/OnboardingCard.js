import React from 'react';

const OnboardingCard = ({ completed, number, children }) => {
  return (
    <div className="bg-white rounded shadow-md p-4 relative flex flex-col justify-between h-full w-full">
      {completed ? (
        <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="absolute top-4 left-4 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          {number}
        </div>
      )}
      <div className="mt-12 flex-1">
        {children}
      </div>
    </div>
  );
};

export default OnboardingCard;
