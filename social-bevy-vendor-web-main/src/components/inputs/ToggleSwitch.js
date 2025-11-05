import React from "react";

const ToggleSwitch = ({ checked, onChange, ...props }) => {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <label className="relative inline-block w-11 h-6" {...props}>
      <input 
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="opacity-0 w-0 h-0"
      />
      <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-200 border-2 border-gray-800 rounded-full transition-colors duration-200 ${checked ? "bg-red-500" : "bg-gray-200"}`}>
        <span className={`absolute left-0 bottom-0 h-5 w-5 bg-red rounded-full border transition-transform duration-200 ${checked ? "transform translate-x-5 bg-white border-red-500" : "bg-red-500 border-gray-200"}`} />
      </span>
    </label>
  );
};

export default ToggleSwitch;