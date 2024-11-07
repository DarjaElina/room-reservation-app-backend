import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import FilterButtons from './FilterButtons';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  console.log('hello search!');

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.input}
        iconColor="#888"
      />
      {/* <FilterButtons /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  searchbar: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: theme.colors.inputBackgrounds,
  },
  input: {
    fontSize: 16,
    minHeight: 0,
  },
});
