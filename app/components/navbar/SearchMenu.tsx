"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';

interface SearchMenuProps {

}

const BUILDING_TYPES = ["Rooms", "Flats", "Hostels", "Villas"];

const SearchMenu: React.FC<SearchMenuProps> = () => {
  const [activeBuildingType, setActiveBuildingType] = useState(BUILDING_TYPES[0]);
  const refs = BUILDING_TYPES.map(() => useRef<HTMLButtonElement>(null));
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
    handleClick(BUILDING_TYPES[0], 0);
  }, []);

  return (
    <div className="relative flex flex-col items-start w-full">
      <div className="flex gap-6">
        {BUILDING_TYPES.map((type, index) => (
          <button
            key={type}
            ref={refs[index]}
            onClick={() => handleClick(type, index)}
            className={`text-lg focus:outline-none font-${activeBuildingType === type ? 'bold' : 'normal'}`}
          >
            {type}
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
