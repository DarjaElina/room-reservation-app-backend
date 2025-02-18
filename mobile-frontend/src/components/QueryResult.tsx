import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import { ApolloError } from '@apollo/client';
import useStyles from '../hooks/useStyles';

interface QueryResultProps {
  loading: boolean;
  error: ApolloError | undefined;
  data: any;
  children: React.ReactNode;
}

const QueryResult = ({ loading, error, data, children }: QueryResultProps) => {
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const styles = useStyles();
  if (loading) {
    return (
      <View
        style={[
          styles.flexContainer,
          styles.scrollContainer,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color={colors.textPrimary}
        />
        <Text
          style={[
            styles.mediumText,
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
          styles.flexContainer,
          styles.scrollContainer,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
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
      <View
        style={[
          styles.flexContainer,
          styles.scrollContainer,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        <Text
          style={[
            styles.mediumText,
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
