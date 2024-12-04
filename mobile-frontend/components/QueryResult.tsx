import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import theme from '../theme';
import { useTheme } from '@react-navigation/native';

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
          Loading...
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
          ERROR: {error.message}
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
          Nothing to show...
        </Text>
      </View>
    );
  }
  return children;
};

export default QueryResult;
