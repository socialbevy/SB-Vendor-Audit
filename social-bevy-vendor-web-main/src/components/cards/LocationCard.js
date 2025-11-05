import React from "react";
import EditLocationForm from "../forms/EditLocationForm";
import { TrashIcon } from "@heroicons/react/24/outline";

const LocationCard = ({ location, openDeleteModal }) => {
  const { 
    locationName,
    address1,
    address2,
    city,
    state,
    zipCode,
    restaurant,
    bar,
    lounge,
    service
  } = location;

  const attributes = [];
  if (restaurant) attributes.push("Restaurant");
  if (bar) attributes.push("Bar");
  if (lounge) attributes.push("Lounge");
  if (service) attributes.push("Service");

  const attributeString = attributes.join(" • ");

  return (
    <div className="py-4 flex justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-black font-semibold">{locationName}</p>
        <p className="text-gray-700">{address1}</p>
        {address2 && (
          <p className="text-gray-700">{address2}</p>
        )}
        <p className="text-gray-700">{city}, {state} {zipCode}</p>
        <p className="text-gray-700">{attributeString}</p>
      </div>
      <div className="flex flex-col justify-between">
        <EditLocationForm location={location} />
        <button onClick={() => openDeleteModal(location.id)}>
          <TrashIcon className="w-6 h-6 text-red-500 text-bold ml-4" />
        </button>
      </div>
    </div>
  );
};

export default LocationCard;