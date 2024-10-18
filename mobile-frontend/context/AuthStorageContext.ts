import { createContext } from 'react';

export interface AuthContextType {
  getAccessToken(): Promise<string | null>;
  setAccessToken(accessToken: string | null): Promise<void>;
  removeAccessToken(): Promise<void>;
}

const AuthStorageContext = createContext<AuthContextType | null>(null);

export default AuthStorageContext;
