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
        name="rooms/[id]"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="rooms/date-time-picker"
        options={{
          title: '',
        }}
      />
    </Stack>
  );
}
