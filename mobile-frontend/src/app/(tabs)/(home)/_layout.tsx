import { Stack } from 'expo-router';
import { FilterProvider } from '@/src/context/FilterContext';
import { useTheme } from '@react-navigation/native';

export default function Layout() {
  const { colors } = useTheme();
  return (
    <FilterProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
          headerTintColor: colors.textPrimary,
          headerShadowVisible: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: '',
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
          name="type-filter"
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
          name="rooms/[id]/create-booking"
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="rooms/[id]/modify-booking"
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="rooms/[id]/confirm-booking-creation"
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="rooms/[id]/confirm-booking-modification"
          options={{
            title: '',
          }}
        />
      </Stack>
    </FilterProvider>
  );
}
