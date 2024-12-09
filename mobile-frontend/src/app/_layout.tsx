import * as Localization from 'expo-localization';
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
import { useState, useEffect } from 'react';
import TypesafeI18n from '@/src/i18n/i18n-react';
import { Locales } from '@/src/i18n/i18n-types';
import { isLocale } from '@/src/i18n/i18n-util';
import { loadLocaleAsync } from '@/src/i18n/i18n-util.async';
import { getUserLocale } from '@/src/utils/localeStorage';
import '@/src/polyfill/Intl';

const DEFAULT_LOCALE =
  Localization.getLocales()
    .map((it) => it.languageTag.split('-')[0])
    .find(isLocale) ?? 'en';

export default function RootLayout() {
  const scheme = useColorScheme();
  const [localeLoaded, setLocaleLoaded] = useState<Locales | null>(null);

  useEffect(() => {
    getUserLocale(DEFAULT_LOCALE)
      .then(async (locale) => {
        await loadLocaleAsync(locale);
        return locale;
      })
      .then(setLocaleLoaded);
  }, []);

  if (localeLoaded === null) return null;

  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <TypesafeI18n locale={localeLoaded}>
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
        </TypesafeI18n>
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
