import { FlatList, Text, View, StyleSheet } from 'react-native';
import BookingItem from './BookingItem';
import useBookings from '../hooks/useBookings';
import { BookingStatus } from '../__generated__/graphql';
import QueryResult from './QueryResult';
import theme from '../theme';

interface BookingListProps {
  userId: string;
  roomId: string;
}

export default function BookingList({ roomId, userId }: BookingListProps) {
  const { loading, bookings, error } = useBookings(
    roomId,
    userId,
    BookingStatus.Active
  );

  if (bookings.length <= 0) {
    return (
      <Text style={styles.message}>
        You have no upcoming reservations for this room.
      </Text>
    );
  }

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <QueryResult error={error} loading={loading} data={bookings}>
      <View style={styles.container}>
        <Text style={styles.header}>Upcoming Reservations For This Room</Text>
        <FlatList
          data={sortedBookings}
          renderItem={({ item }) => (
            <BookingItem startDate={item.startDate} endDate={item.endDate} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </QueryResult>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.medium,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme.colors.shadowOpacity,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium,
    color: theme.colors.textPrimary,
  },
  message: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginVertical: theme.spacing.large,
  },
  listContent: {
    gap: theme.spacing.medium,
  },
});
