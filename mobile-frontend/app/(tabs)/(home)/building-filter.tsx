import { View, Text, StyleSheet } from 'react-native';
import useVenues from '../../../hooks/useVenues';
import CheckBox from '../../../components/CheckBox';
import SearchBar from '../../../components/SearchBar';
import useFilter from '../../../hooks/useFilter';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export default function BuildingFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { buildings, loading, error } = useVenues({
    searchKeyword: debouncedSearchQuery,
  });
  const { buildings: selectedBuildings, setBuildings } = useFilter();

  if (loading) {
    return <Text style={styles.loadingText}>Loading buildings...</Text>;
  }

  const options = buildings.map((b) => {
    return { label: b.name, value: b.id };
  });

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#340b46',
    padding: 20,
  },
  loadingText: {
    color: '#e3d5f0',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#090623',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
});
