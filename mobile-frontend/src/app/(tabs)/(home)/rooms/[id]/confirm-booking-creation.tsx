import { View, StyleSheet, Alert } from 'react-native';
import QueryResult from '@/src/components/QueryResult';
import BookingDetailsCard from '@/src/components/BookingDetailsCard';
import UserMessage from '@/src/components/UserMessage';
import useBookingContext from '@/src/hooks/useBookingContext';
import { useLocalSearchParams } from 'expo-router';
import useRoom from '@/src/hooks/useRoom';
import useBooking from '@/src/hooks/useBooking';
import { useState } from 'react';
import { router } from 'expo-router';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';

export default function ConfirmBookingCreationScreen() {
  const { bookingStartDate, bookingEndDate } = useBookingContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading: roomLoading, room, error: roomError } = useRoom(id);
  const [createBooking, { loading }] = useBooking();
  const [userMessage, setUserMessage] = useState<string | null>('');
  const [bookingTitle, setBookingTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { colors } = useTheme();

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
      <View
        style={[
          styles.container,
          { backgroundColor: colors.backgroundPrimary },
        ]}
      >
        <UserMessage text={userMessage} />
        <BookingDetailsCard
          roomCode={room?.code}
          bookingStartDate={bookingStartDate}
          bookingEndDate={bookingEndDate}
          bookingTitle={bookingTitle}
          setBookingTitle={setBookingTitle}
          error={error}
          onSubmit={handleSubmit}
          buttonText="Reserve"
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
    paddingHorizontal: theme.spacing.large,
  },
});
