import { useContext } from 'react';
import { FilterContext } from '@/src/context/FilterContext';

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export default useFilter;
