import { View, StyleSheet } from 'react-native';
import CheckBox from '@/src/components/CheckBox';
import SearchBar from '@/src/components/SearchBar';
import useFilter from '@/src/hooks/useFilter';
import { RoomType } from '@/__generated__/graphql';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useTheme } from '@react-navigation/native';
import useStyles from '@/src/hooks/useStyles';

export const RoomTypeLabels: Record<RoomType, string> = {
  [RoomType.AdministrativeSpace]: 'Administrative Space',
  [RoomType.Classroom]: 'Classroom',
  [RoomType.ConcertHall]: 'Concert Hall',
  [RoomType.Library]: 'Library',
  [RoomType.MeetingRoom]: 'Meeting Room',
  [RoomType.PracticeRoom]: 'Practice Room',
  [RoomType.Studio]: 'Studio',
  [RoomType.Theater]: 'Theater',
};

export default function TypeFilter() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { types, setTypes } = useFilter();
  const styles = useStyles();

  const options = Object.entries(RoomTypeLabels).map(([value, label]) => ({
    label,
    value,
  }));

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );
  return (
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
        placeholder="Search room types..."
      />
      <CheckBox
        options={filteredOptions}
        checkedValues={types}
        onChange={setTypes as React.Dispatch<React.SetStateAction<string[]>>}
      />
    </View>
  );
}
