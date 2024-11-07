import { Stack } from 'expo-router';
import theme from '../../../theme';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundPrimary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="building-filter"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="equipment-filter"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="time-filter"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="rooms/[id]/index"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="rooms/[id]/date-time-picker"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="rooms/[id]/confirm-booking"
        options={{
          title: '',
        }}
      />
    </Stack>
  );
}
