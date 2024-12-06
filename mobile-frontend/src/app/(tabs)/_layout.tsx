import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '@/src/graphql/queries';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '@/src/theme';
import { Text, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

export default function TabLayout() {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const { colors } = useTheme();
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.textPrimary} />
        <Text
          style={[
            styles.text,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          Loading...
        </Text>
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
        tabBarActiveTintColor: colors.buttonBackground,
        tabBarStyle: {
          backgroundColor: colors.backgroundPrimary,
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
  },
  text: {
    marginTop: theme.spacing.small,
    fontSize: theme.fontSizes.subheading,
  },
});
