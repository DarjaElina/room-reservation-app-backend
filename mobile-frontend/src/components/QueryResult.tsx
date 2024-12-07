import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: theme.spacing.small,
    fontSize: theme.fontSizes.subheading,
  },
  errorText: {
    fontSize: theme.fontSizes.subheading,
  },
});

const QueryResult = ({ loading, error, data, children }) => {
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.textPrimary} />
        <Text
          style={[
            styles.text,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          {LL.LOADING()}
        </Text>
      </View>
    );
  }
  if (error) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        <Text
          style={[
            styles.errorText,
            {
              color: colors.error,
            },
          ]}
        >
          `{LL.ERROR}: {error.message}`
        </Text>
      </View>
    );
  }
  if (!data) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          {LL.NOTHING_TO_SHOW()}
        </Text>
      </View>
    );
  }
  return children;
};

export default QueryResult;
