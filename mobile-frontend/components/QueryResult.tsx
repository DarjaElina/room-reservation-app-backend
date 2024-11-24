import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
  },
  text: {
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.small,
    fontSize: theme.fontSizes.subheading,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSizes.subheading,
  },
});

const QueryResult = ({ loading, error, data, children }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.textPrimary} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>ERROR: {error.message}</Text>
      </View>
    );
  }
  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nothing to show...</Text>
      </View>
    );
  }
  return children;
};

export default QueryResult;
