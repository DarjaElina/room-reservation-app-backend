import { View } from 'react-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import useRooms from '@/src/hooks/useRooms';
import RoomListContainer from './RoomListContainer';
import SearchBar from '../SearchBar';
import FilterButtons from '../FilterButtons';
import useFilter from '@/src/hooks/useFilter';
import { PaperProvider } from 'react-native-paper';
import QueryResult from '../QueryResult';
import { useI18nContext } from '@/src/i18n/i18n-react';
import useStyles from '@/src/hooks/useStyles';

export default function RoomListWrapper() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 2000);
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
  const { LL } = useI18nContext();
  const styles = useStyles();
  const onEndReach = () => {
    fetchMore();
  };

  const roomNodes = rooms.edges ? rooms.edges.map((edge) => edge?.node) : [];

  return (
    <PaperProvider>
      <QueryResult loading={loading} error={error} data={rooms}>
        <View style={[styles.scrollContainer, styles.flexContainer]}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={LL.SEARCH_ROOMS_BY_CODE()}
          />
          <FilterButtons />
          <RoomListContainer rooms={roomNodes} onEndReach={onEndReach} />
        </View>
      </QueryResult>
    </PaperProvider>
  );
}
