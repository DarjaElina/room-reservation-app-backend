import { View, Text, StyleSheet } from 'react-native';
import useEquipment from '../../../hooks/useEquipment';
import CheckBox from '../../../components/CheckBox';
import SearchBar from '../../../components/SearchBar';
import useFilter from '../../../hooks/useFilter';

export default function EquipmentFilter() {
  const { equipment, loading, error } = useEquipment();
  const { equipment: selectedEquipment, setEquipment } = useFilter();

  if (loading) {
    return <Text style={styles.loadingText}>Loading equipment...</Text>;
  }

  const options = equipment.map((b) => {
    return { label: b.name, value: b.id };
  });

  return (
    <View style={styles.container}>
      <SearchBar />
      <CheckBox
        options={options}
        checkedValues={selectedEquipment}
        onChange={setEquipment}
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
