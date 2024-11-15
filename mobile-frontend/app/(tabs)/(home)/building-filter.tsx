import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import useVenues from '../../../hooks/useVenues';
import SearchBar from '../../../components/SearchBar';
import CheckboxItem from '../../../components/CheckboxItem';

export default function BuildingFilter() {
  const [checked, setChecked] = useState(false);
  const { buildings, loading, error } = useVenues();

  if (loading) {
    return <Text style={styles.loadingText}>Loading buildings...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={buildings}
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
