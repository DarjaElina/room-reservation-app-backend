import { View, StyleSheet, Alert } from 'react-native';
import QueryResult from '@/components/QueryResult';
import BookingDetailsCard from '@/components/BookingDetailsCard';
import UserMessage from '@/components/UserMessage';
import useBookingContext from '@/hooks/useBookingContext';
import { useLocalSearchParams } from 'expo-router';
import useRoom from '@/hooks/useRoom';
import useBooking from '@/hooks/useBooking';
import { useState } from 'react';
import { router } from 'expo-router';
import theme from '@/theme';

export default function ConfirmBookingCreationScreen() {
  const { bookingStartDate, bookingEndDate } = useBookingContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading: roomLoading, room, error: roomError } = useRoom(id);
  const [createBooking, { loading }] = useBooking();
  const [userMessage, setUserMessage] = useState<string | null>('');
  const [bookingTitle, setBookingTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      await createBooking(
        id,
        new Date(bookingStartDate).getTime(),
        new Date(bookingEndDate).getTime(),
        bookingTitle.trim() || undefined
      );
      setUserMessage('Booking created successfully.');
      setBookingTitle('');
      setTimeout(() => {
        setUserMessage(null);
        router.navigate('/(tabs)/(home)');
      }, 2000);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <QueryResult data={room} loading={roomLoading} error={roomError}>
      <View style={styles.container}>
        <UserMessage text={userMessage} />
        <BookingDetailsCard
          roomCode={room?.code}
          bookingStartDate={bookingStartDate}
          bookingEndDate={bookingEndDate}
          bookingTitle={bookingTitle}
          setBookingTitle={setBookingTitle}
          error={error}
          onSubmit={handleSubmit}
          buttonText='Reserve'
        />
      </View>
    </QueryResult>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: theme.spacing.large,
  },
});
