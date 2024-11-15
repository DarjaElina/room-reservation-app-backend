import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  equipment: string[];
  setEquipment: React.Dispatch<React.SetStateAction<string[]>>;
  building: string;
  setBuilding: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [building, setBuilding] = useState('');

  const value = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    equipment,
    setEquipment,
    building,
    setBuilding,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
