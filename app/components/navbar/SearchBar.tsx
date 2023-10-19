"use client";

import React, { FC } from 'react';
import { BiSearch } from "react-icons/bi";

interface InputSectionProps {
  label: string;
  placeholder: string;
}

const InputSection: FC<InputSectionProps> = ({ label, placeholder }) => (
  <div className="p-4 rounded-full cursor-pointer flex items-center space-x-2 hover:bg-neutral-100">
    <div className="flex flex-col">
      <p>{label}</p>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none py-1 focus:outline-none placeholder-gray-300 placeholder:font-semibold"
      />
    </div>
    {label === 'Guests' && (
      <div className="bg-pyellow rounded-full p-4 text-white transition hover:bg-pyellowHover">
        <BiSearch size={30} />
      </div>
    )}
  </div>
);


const SearchBar: FC = () => {
  const sections = [
    { label: 'Location', placeholder: 'Which city do you prefer?' },
    { label: 'Check In', placeholder: 'Add dates' },
    { label: 'Check Out', placeholder: 'Add dates' },
    { label: 'Guests', placeholder: 'Add guests' },
  ];

  return (
    <div className="bg-white rounded-full shadow-lg border-2 border-neutral-300">
      <div className="text-base flex items-center font-medium">
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <InputSection label={section.label} placeholder={section.placeholder} />
            {index !== sections.length - 1 && <div className="border-l border-neutral-300 h-10"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
