import { FlatList, Text, View, StyleSheet } from 'react-native';
import BookingItem from './BookingItem';
import useBookings from '../hooks/useBookings';
import QueryResult from './QueryResult';
import theme from '../theme';

interface BookingListProps {
  queryOptions: {
    roomId?: string;
    userId?: string;
    status?: string;
  };
  emptyMessage: string;
}

export default function BookingList({
  queryOptions,
  emptyMessage,
}: BookingListProps) {
  const { loading, bookings, error } = useBookings(queryOptions);

  if (!loading && bookings.length <= 0) {
    return <Text style={styles.message}>{emptyMessage}</Text>;
  }

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <QueryResult error={error} loading={loading} data={bookings}>
      <View style={styles.container}>
        <FlatList
          data={sortedBookings}
          renderItem={({ item }) => (
            <BookingItem
              startDate={item.startDate}
              endDate={item.endDate}
              roomCode={item.room.code}
              title={item.title}
              id={item.id}
              roomId={item.room.id}
            />
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
    backgroundColor: theme.colors.backgroundPrimary,
  },
  message: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginVertical: theme.spacing.large,
  },
  listContent: {
    gap: theme.spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
