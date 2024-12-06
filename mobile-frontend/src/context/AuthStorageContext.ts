import { createContext } from 'react';

export interface AuthStorageContextType {
  getAccessToken(): Promise<string | null>;
  setAccessToken(accessToken: string | null): Promise<void>;
  removeAccessToken(): Promise<void>;
}

const AuthStorageContext = createContext<AuthStorageContextType | null>(null);

export default AuthStorageContext;
