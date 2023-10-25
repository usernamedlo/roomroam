"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';

import { MdOutlineVilla, MdOutlineApartment, MdOutlineBedroomParent } from 'react-icons/md';
import { FaPeopleRobbery } from 'react-icons/fa6';
import { BsHouseHeart } from 'react-icons/bs';
import { GiMushroomHouse, GiTreehouse } from 'react-icons/gi';

interface SearchMenuProps {

}

export const categories = [
  {
    key: 'house',
    label: 'House',
    icon: BsHouseHeart,
    description: 'Entire place',
  },
  {
    key: 'flat',
    label: 'Flat',
    icon: MdOutlineApartment,
    description: 'Cosy location',
  },
  {
    key: 'room',
    label: 'Room',
    icon: MdOutlineBedroomParent,
    description: 'Private room',
  },
  {
    key: 'hostel',
    label: 'Hostel',
    icon: FaPeopleRobbery,
    description: 'Shared room',
  },
  {
    key: 'villa',
    label: 'Villa',
    icon: MdOutlineVilla,
    description: 'Entire beautiful place',
  },
  {
    key: 'treehouse',
    label: 'Treehouse',
    icon: GiTreehouse,
    description: 'Leafy location'
  },
  {
    key: 'experience',
    label: 'Experience',
    icon: GiMushroomHouse,
    description: 'Unique activities'
  }
]

const SearchMenu: React.FC<SearchMenuProps> = () => {
  const [activeBuildingType, setActiveBuildingType] = useState(categories[0].label);
  const refs = Array(categories.length).fill(0).map(() => useRef<HTMLButtonElement>(null));
  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0%', width: '0%' });

  const handleClick = useCallback((type: string, index: number) => {
    setActiveBuildingType(type);
    const button = refs[index].current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const parentRect = button.parentElement?.getBoundingClientRect();
      setIndicatorStyle({
        left: `${rect.left - (parentRect?.left || 0)}px`,
        width: `${rect.width / 2}px`
      });
    }
  }, [refs]);

  useEffect(() => {
    handleClick(categories[0].label, 0);
  }, []);



  return (
    <div className="relative flex flex-col items-start w-full">
      <div className="flex gap-6">
        {categories.map((type, index) => (
          <button
            key={type.key}
            ref={refs[index]}
            onClick={() => handleClick(type.label, index)}
            className={`text-lg focus:outline-none font-${activeBuildingType === type.label ? 'bold' : 'normal'}`}
          >
            <div className='flex flex-row items-center gap-1'>
              {type.label} {type.icon && <type.icon />}
            </div>
          </button>
        ))}
      </div>
      <div
        className="absolute mt-7 h-[0.15rem] bg-pyellow transition-all duration-300"
        style={indicatorStyle}
      />
    </div>
  );
}

export default SearchMenu;
