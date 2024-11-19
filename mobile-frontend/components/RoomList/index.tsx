import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import theme from '../../theme';
import useRooms from '../../hooks/useRooms';
import RoomListContainer from './RoomListContainer';
import SearchBar from '../SearchBar';
import FilterButtons from '../FilterButtons';
import useFilter from '../../hooks/useFilter';
import { PaperProvider } from 'react-native-paper';

export default function RoomListWrapper() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { startDate, endDate, buildings, equipment, types } = useFilter();
  console.log(types);

  const { rooms, loading, error, fetchMore } = useRooms({
    first: 4,
    searchKeyword: debouncedSearchQuery,
    startsAt: startDate?.getTime() ?? undefined,
    endsAt: endDate?.getTime() ?? undefined,
    venueIds: buildings,
    equipmentIds: equipment,
    roomTypes: types,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={theme.colors.backgroundPrimary}
        />
        <Text>Loading rooms...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Error loading rooms: {error.message}</Text>;
  }

  const roomNodes = rooms ? rooms.edges.map((edge) => edge.node) : [];

  console.log(roomNodes.length);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search rooms by code..."
        />
        <FilterButtons />
        <RoomListContainer rooms={roomNodes} onEndReach={onEndReach} />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
