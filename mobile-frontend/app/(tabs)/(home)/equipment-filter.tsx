import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import useEquipment from '../../../hooks/useEquipment';
import SearchBar from '../../../components/SearchBar';
import CheckboxItem from '../../../components/CheckboxItem';

export default function BuildingFilter() {
  const [checked, setChecked] = useState(false);
  const { equipment, loading, error } = useEquipment();

  console.log(equipment);

  if (loading) {
    return <Text style={styles.loadingText}>Loading equipment...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<SearchBar />}
        data={equipment}
        renderItem={({ item }) => (
          <CheckboxItem
            name={item.name}
            setChecked={setChecked}
            isChecked={checked}
          />
        )}
        keyExtractor={(item) => item.name}
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
});
