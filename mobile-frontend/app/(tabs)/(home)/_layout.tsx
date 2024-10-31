import { Stack } from 'expo-router';
import theme from '../../../theme';
import { useBookingContext } from '../../../hooks/useBookingContext';
import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function Layout() {
  const { handleSubmit } = useBookingContext();
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
