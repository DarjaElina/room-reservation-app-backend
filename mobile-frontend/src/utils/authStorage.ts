import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AuthStorageContextType } from '@/src/context/AuthStorageContext';

class AuthStorage implements AuthStorageContextType {
  namespace: string;
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken = async (): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(`${this.namespace}_accessToken`);
      } else {
        return await SecureStore.getItemAsync(`${this.namespace}_accessToken`);
      }
    } catch (e) {
      console.log('Error fetching access token:', e);
      return null;
    }
  };

  setAccessToken = async (accessToken: string | null): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (accessToken === null) {
          localStorage.removeItem(`${this.namespace}_accessToken`);
        } else {
          localStorage.setItem(`${this.namespace}_accessToken`, accessToken);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      if (accessToken == null) {
        await SecureStore.deleteItemAsync(`${this.namespace}_accessToken`);
      } else {
        await SecureStore.setItemAsync(
          `${this.namespace}_accessToken`,
          accessToken
        );
      }
    }
  };

  removeAccessToken = async (): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(`${this.namespace}_accessToken`);
    } else {
      await SecureStore.deleteItemAsync(`${this.namespace}_accessToken`);
    }
  };
}

export default AuthStorage;
