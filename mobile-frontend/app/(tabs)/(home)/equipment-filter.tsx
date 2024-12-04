import { View, Text, StyleSheet } from 'react-native';
import useEquipment from '../../../hooks/useEquipment';
import CheckBox from '../../../components/CheckBox';
import SearchBar from '../../../components/SearchBar';
import useFilter from '../../../hooks/useFilter';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import theme from '../../../theme';
import QueryResult from '@/components/QueryResult';
import { useTheme } from '@react-navigation/native';

export default function EquipmentFilter() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { equipment, loading, error } = useEquipment({
    searchKeyword: debouncedSearchQuery,
  });
  const { equipment: selectedEquipment, setEquipment } = useFilter();

  const options = equipment.map((b) => {
    return { label: b.name, value: b.id };
  });

  return (
    <QueryResult loading={loading} error={error} data={equipment}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.backgroundPrimary },
        ]}
      >
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search equipment..."
        />
        <CheckBox
          options={options}
          checkedValues={selectedEquipment}
          onChange={setEquipment}
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
