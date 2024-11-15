import { Slot } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../utils/apolloClient';
import AuthStorageContext from '../context/AuthStorageContext';
import AuthStorage from '../utils/authStorage';
import theme from '../theme';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookingProvider } from '../context/BookingContext';

const authStorage = new AuthStorage();

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <BookingProvider>
          <SafeAreaView style={styles.container}>
            <Slot />
          </SafeAreaView>
        </BookingProvider>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 5,
  },
});
