import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../../graphql/queries';
import Text from '../../components/Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '../../theme';

export default function TabLayout() {
  const { loading, error, data } = useQuery(CURRENT_USER);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data?.currentUser) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: theme.colors.backgroundPrimary,
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="(home)/index"
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
        name="(home)/calendar"
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
      <Tabs.Screen
        name="rooms/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
