import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const BackButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="flex items-center py-4 text-lg hover:text-red-500">
      <ChevronLeftIcon className=" h-5 w-5 mr-2" />
      {children}
    </button>
  )
};

export default BackButton;