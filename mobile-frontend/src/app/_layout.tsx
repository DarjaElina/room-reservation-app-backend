import { Slot } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/src/utils/apolloClient';
import AuthStorageContext from '@/src/context/AuthStorageContext';
import AuthStorage from '@/src/utils/authStorage';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookingProvider } from '@/src/context/BookingContext';
import { ThemeProvider } from '@react-navigation/native';
import { customLightTheme, customDarkTheme } from '@/src/constants/ColorTheme';
const authStorage = new AuthStorage();
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const scheme = useColorScheme();
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <BookingProvider>
          <SafeAreaView style={styles.container}>
              <ThemeProvider
                value={scheme === 'dark' ? customDarkTheme : customLightTheme}
              >
                  <StatusBar style="auto" />
                  <Slot />
              </ThemeProvider>
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
  },
});
