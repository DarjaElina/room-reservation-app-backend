import { View } from 'react-native';
import useEquipment from '@/src/hooks/useEquipment';
import CheckBox from '@/src/components/CheckBox';
import SearchBar from '@/src/components/SearchBar';
import useFilter from '@/src/hooks/useFilter';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import useStyles from '@/src/hooks/useStyles';
import QueryResult from '@/src/components/QueryResult';
import { useTheme } from '@react-navigation/native';

export default function EquipmentFilter() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 2000);
  const { equipment, loading, error } = useEquipment({
    searchKeyword: debouncedSearchQuery,
  });
  const { equipment: selectedEquipment, setEquipment } = useFilter();
  const styles = useStyles();

  const options = equipment.map((b) => {
    return { label: b.name, value: b.id };
  });

  return (
    <QueryResult loading={loading} error={error} data={equipment}>
      <View
        style={[
          styles.scrollContainer,
          styles.flexContainer,

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
