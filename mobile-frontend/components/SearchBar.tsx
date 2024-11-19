import { Searchbar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  console.log('i am search bar!');

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
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
