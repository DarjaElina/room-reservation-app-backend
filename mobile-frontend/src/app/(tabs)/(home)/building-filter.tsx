import { View, Text, StyleSheet } from 'react-native';
import useVenues from '@/src/hooks/useVenues';
import CheckBox from '@/src/components/CheckBox';
import SearchBar from '@/src/components/SearchBar';
import useFilter from '@/src/hooks/useFilter';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import QueryResult from '@/src/components/QueryResult';
import { useTheme } from '@react-navigation/native';

export default function BuildingFilter() {
  const { colors } = useTheme();
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
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
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
    padding: 20,
  },
});
