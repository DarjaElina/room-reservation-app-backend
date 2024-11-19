import { View, StyleSheet } from 'react-native';
import CheckBox from '../../../components/CheckBox';
import SearchBar from '../../../components/SearchBar';
import useFilter from '../../../hooks/useFilter';
import { RoomType } from '../../../__generated__/graphql';

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
  const { types, setTypes } = useFilter();

  const options = Object.entries(RoomTypeLabels).map(([value, label]) => ({
    label,
    value,
  }));

  return (
    <View style={styles.container}>
      <SearchBar />
      <CheckBox options={options} checkedValues={types} onChange={setTypes} />
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
