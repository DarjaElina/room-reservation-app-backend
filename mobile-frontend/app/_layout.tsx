import { Slot, Stack } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../utils/apolloClient';
import AuthStorageContext from '../context/AuthStorageContext';
import AuthStorage from '../utils/authStorage';
import { View } from 'react-native';
import theme from '../theme';
import { StyleSheet } from 'react-native';

const authStorage = new AuthStorage();

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <View style={styles.container}>
          <Slot />
        </View>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
  },
});
