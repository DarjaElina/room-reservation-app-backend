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
    </FilterProvider>
  );
}
