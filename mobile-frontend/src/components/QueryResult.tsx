import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import { ApolloError } from '@apollo/client';
import useStyles from '../hooks/useStyles';

interface QueryResultProps {
  loading: boolean;
  error: ApolloError | undefined;
  data: unknown;
  children: React.ReactNode;
}

const QueryResult = ({ loading, error, data, children }: QueryResultProps) => {
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const styles = useStyles();
  if (loading) {
    return (
      <View style={[styles.flexContainer, styles.scrollContainer]}>
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color={colors.primary}
        />
        <Text
          style={[
            styles.mediumText,
            {
              color: colors.text,
              textAlign: 'center',
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
      <View style={[styles.flexContainer, styles.scrollContainer]}>
        <Text
          testID="error-text"
          style={[
            styles.errorText,
            {
              color: colors.error,
            },
          ]}
        >
          {LL.ERROR()}: {error.message}
        </Text>
      </View>
    );
  }
  if (!data) {
    return (
      <View style={[styles.flexContainer, styles.scrollContainer]}>
        <Text
          style={[
            styles.mediumText,
            {
              color: colors.text,
              textAlign: 'center',
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
