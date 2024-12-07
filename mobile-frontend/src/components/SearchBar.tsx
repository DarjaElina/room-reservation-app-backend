import { Searchbar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react'

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
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={LL.SEARCH()}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={[
          styles.searchbar,
          {
            borderColor: colors.inputBorder,
            backgroundColor: colors.backgroundSecondary,
            shadowColor: colors.shadow,
            shadowOpacity: colors.shadowOpacity,
          },
        ]}
        inputStyle={[styles.input, { color: colors.textPrimary }]}
        placeholderTextColor={colors.textSecondary}
        iconColor={colors.textSecondary}
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

    elevation: 5,

    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    overflow: 'hidden',
  },
  input: {
    fontSize: theme.fontSizes.body,
    minHeight: 0,
  },
});
