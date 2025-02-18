import { View, StyleSheet } from 'react-native';
import BookingList from '@/src/components/BookingList';
import useAuth from '@/src/hooks/useAuth';
import { BookingStatus } from '@/__generated__/graphql';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '@/src/i18n/i18n-react';
import useStyles from '@/src/hooks/useStyles';
import { router } from 'expo-router';

export default function AboutScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { LL } = useI18nContext();
  const styles = useStyles();
  if (!user) {
    router.replace('/sign-in');
  }
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
      <BookingList
        queryOptions={{ userId: user?.id, status: BookingStatus.Active }}
        emptyMessage={LL.NO_UPCOMING_BOOKINGS()}
      />
    </View>
  );
}
