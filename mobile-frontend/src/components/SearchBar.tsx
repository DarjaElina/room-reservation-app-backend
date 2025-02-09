import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const styles = useStyles();
  return (
    <View style={styles.inputContainer}>
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
        inputStyle={{ color: colors.textPrimary, minHeight: 0 }}
        placeholderTextColor={colors.textSecondary}
        iconColor={colors.textSecondary}
      />
    </View>
  );
}
