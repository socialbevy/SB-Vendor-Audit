import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import ubuntu from "@/utils/ubuntu";

const DeleteLocationContent = ({ deleteLocation, closeModal }) => {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="p-4 mb-4 border-2 rounded-full border-red-500 bg-red-500 bg-opacity-10">
        <TrashIcon className="w-12 h-12 text-red-500" />
      </div>
      <h2 className={`font-semibold text-gray-800 text-lg ${ubuntu.className}`}>Are you sure want to delete this location?</h2>
      <div className="border-b border-gray-200 w-full my-4" />
      <div className="flex flex-col gap-2">
        <button 
          className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={deleteLocation}
        >
          Confirm Delete
        </button>
        <button
          className="w-full py-2 px-4 bg-white text-black font-semibold hover:font-bold"
          onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteLocationContent;