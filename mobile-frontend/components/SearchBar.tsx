import { Searchbar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholder = 'Search...',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.input}
        placeholderTextColor={theme.colors.textSecondary}
        iconColor={theme.colors.textSecondary}
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
    height: 50,
    borderRadius: theme.borderRadius.large,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.inputBorder,
    elevation: 5,
    backgroundColor: theme.colors.backgroundSecondary,
    shadowColor: theme.colors.shadow,
    shadowOpacity: theme.colors.shadowOpacity,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    overflow: 'hidden',
  },
  input: {
    fontSize: theme.fontSizes.body,
    minHeight: 0,
    color: theme.colors.textPrimary,
  },
});
