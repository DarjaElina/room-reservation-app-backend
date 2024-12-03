import { Stack } from 'expo-router';
import theme from '../../../theme';
import { FilterProvider } from '../../../context/FilterContext';

export default function Layout() {
  return (
    <FilterProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.backgroundPrimary,
          },
          headerTintColor: theme.colors.textPrimary,
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
