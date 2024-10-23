import { FlatList, Text, View } from 'react-native';
import BookingItem from './BookingItem';
import useBookings from '../hooks/useBookings';

interface BookingListProps {
  userId: string;
  roomId: string;
}

export default function BookingList({ roomId, userId }: BookingListProps) {
  const { loading, bookings } = useBookings(roomId, userId);
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (bookings.length <= 0) {
    return <Text>You have no upcoming reservations for this room.</Text>;
  }
  return (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
        Upcoming Reservations For This Room
      </Text>
      <FlatList
        data={bookings}
        renderItem={({ item }) => (
          <BookingItem startDate={item.startDate} endDate={item.endDate} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
