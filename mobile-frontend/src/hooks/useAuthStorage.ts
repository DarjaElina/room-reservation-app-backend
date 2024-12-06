import { useContext } from 'react';
import AuthStorageContext from '@/src/context/AuthStorageContext';

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;
