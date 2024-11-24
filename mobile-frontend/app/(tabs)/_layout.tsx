import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../../graphql/queries';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '../../theme';
import { Text, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
export default function TabLayout() {
  const { loading, error, data } = useQuery(CURRENT_USER);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.textPrimary} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
  if (!data?.currentUser) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.buttonBackground,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'grid-sharp' : 'grid-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'My Calendar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'calendar-sharp' : 'calendar-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'settings-sharp' : 'settings-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary, // Using theme backgroundPrimary
  },
  text: {
    color: theme.colors.textPrimary, // Use textPrimary color from theme
    marginTop: theme.spacing.small, // Use theme spacing
    fontSize: theme.fontSizes.subheading, // Use theme font size
  },
  errorText: {
    color: theme.colors.error, // Use error color from theme
    fontSize: theme.fontSizes.subheading, // Use theme font size
  },
});
