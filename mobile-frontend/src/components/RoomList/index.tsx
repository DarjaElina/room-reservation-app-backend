import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import useRooms from '@/src/hooks/useRooms';
import RoomListContainer from './RoomListContainer';
import SearchBar from '../SearchBar';
import FilterButtons from '../FilterButtons';
import useFilter from '@/src/hooks/useFilter';
import { PaperProvider } from 'react-native-paper';
import QueryResult from '../QueryResult';

export default function RoomListWrapper() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { startDate, endDate, buildings, equipment, types } = useFilter();

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

  const roomNodes = rooms.edges ? rooms.edges.map((edge) => edge.node) : [];

  return (
    <PaperProvider>
      <QueryResult loading={loading} error={error} data={rooms}>
        <View style={styles.container}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search rooms by code..."
          />
          <FilterButtons />
          <RoomListContainer rooms={roomNodes} onEndReach={onEndReach} />
        </View>
      </QueryResult>
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
