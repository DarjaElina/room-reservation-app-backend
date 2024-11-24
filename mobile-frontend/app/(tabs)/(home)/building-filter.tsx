import { View, Text, StyleSheet } from 'react-native';
import useVenues from '../../../hooks/useVenues';
import CheckBox from '../../../components/CheckBox';
import SearchBar from '../../../components/SearchBar';
import useFilter from '../../../hooks/useFilter';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import theme from '@/theme';
import QueryResult from '@/components/QueryResult';

export default function BuildingFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { buildings, loading, error } = useVenues({
    searchKeyword: debouncedSearchQuery,
  });
  const { buildings: selectedBuildings, setBuildings } = useFilter();

  const options = buildings.map((b) => {
    return { label: b.name, value: b.id };
  });

  return (
    <QueryResult loading={loading} error={error} data={buildings}>
      <View style={styles.container}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search building by name..."
        />
        <CheckBox
          options={options}
          checkedValues={selectedBuildings}
          onChange={setBuildings}
        />
      </View>
    </QueryResult>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
  },
});
