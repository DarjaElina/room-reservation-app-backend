import { FlatList, Text, View } from 'react-native';
import BookingItem from './BookingItem';
import useBookings from '../hooks/useBookings';
import { BookingStatus } from '../__generated__/graphql';

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
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading upcoming bookings.</Text>;
  }

  if (bookings.length <= 0) {
    return <Text>You have no upcoming reservations for this room.</Text>;
  }

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  return (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
        Upcoming Reservations For This Room
      </Text>
      <FlatList
        data={sortedBookings}
        renderItem={({ item }) => (
          <BookingItem startDate={item.startDate} endDate={item.endDate} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
