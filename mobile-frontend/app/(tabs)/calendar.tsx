import { Text, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import BookingList from '@/components/BookingList';
import useAuth from '@/hooks/useAuth';
import { BookingStatus } from '@/__generated__/graphql';

export default function AboutScreen() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <BookingList
        queryOptions={{ userId: user.id, status: BookingStatus.Active }}
        emptyMessage="You have no upcoming bookings."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: 'center',
    paddingTop: 50,
  },
});
