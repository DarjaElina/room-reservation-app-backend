import { FlatList, Text, View, StyleSheet } from 'react-native';
import BookingItem from './BookingItem';
import useBookings from '@/src/hooks/useBookings';
import QueryResult from './QueryResult';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

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
  const { colors } = useTheme();
  const styles = useStyles();

  if (!loading && bookings.length <= 0) {
    return (
      <Text
        style={[
          styles.bookingMessage,
          {
            color: colors.textPrimary,
          },
        ]}
      >
        {emptyMessage}
      </Text>
    );
  }

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <QueryResult error={error} loading={loading} data={bookings}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
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
        />
      </View>
    </QueryResult>
  );
}
