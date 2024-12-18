import React, { createContext, useState } from 'react';
import { RoomType } from '@/__generated__/graphql';

interface FilterContextType {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  equipment: string[];
  setEquipment: React.Dispatch<React.SetStateAction<string[]>>;
  buildings: string[];
  setBuildings: React.Dispatch<React.SetStateAction<string[]>>;
  types: RoomType[];
  setTypes: React.Dispatch<React.SetStateAction<RoomType[]>>;
}

export const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [buildings, setBuildings] = useState<string[]>([]);
  const [types, setTypes] = useState<RoomType[]>([]);

  const value = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    equipment,
    setEquipment,
    buildings,
    setBuildings,
    types,
    setTypes,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
