// SearchMenu.tsx
import React, { useState } from 'react';

type BuildingType = 'Rooms' | 'Flats' | 'Hostels' | 'Villas';

interface SearchMenuProps {
  onBuildingTypeSelected?: (type: BuildingType) => void;
}

const SearchMenu: React.FC<SearchMenuProps> = ({ onBuildingTypeSelected }) => {
  const [activeType, setActiveType] = useState<BuildingType>('Rooms');

  const handleTypeClick = (type: BuildingType) => {
    setActiveType(type);
    onBuildingTypeSelected && onBuildingTypeSelected(type);
  };

  return (
    <div className="relative">
      <ul className="flex space-x-4">
        <MenuItem type="Rooms" activeType={activeType} onTypeClick={handleTypeClick} />
        <MenuItem type="Flats" activeType={activeType} onTypeClick={handleTypeClick} />
        <MenuItem type="Hostels" activeType={activeType} onTypeClick={handleTypeClick} />
        <MenuItem type="Villas" activeType={activeType} onTypeClick={handleTypeClick} />
      </ul>
      <ActiveLine type={activeType} />
    </div>
  );
};

interface MenuItemProps {
  type: BuildingType;
  activeType: BuildingType;
  onTypeClick: (type: BuildingType) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ type, activeType, onTypeClick }) => {
  return (
    <li
      className={`cursor-pointer ${activeType === type ? 'text-blue-500' : 'text-gray-500'}`}
      onClick={() => onTypeClick(type)}
    >
      {type}
    </li>
  );
};

const ActiveLine: React.FC<{ type: BuildingType }> = ({ type }) => {
  const getIndex = (type: BuildingType) => {
    switch (type) {
      case 'Rooms':
        return 0;
      case 'Flats':
        return 1;
      case 'Hostels':
        return 2;
      case 'Villas':
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div
      className="absolute h-1 bg-blue-500 mt-1 transition-all ease-in-out duration-300"
      style={{
        width: '1%',
        transform: `translateX(${getIndex(type) * 350}%)`
      }}
    ></div>
  );
};

export default SearchMenu;
