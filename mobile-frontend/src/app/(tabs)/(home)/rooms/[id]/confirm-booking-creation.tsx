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
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '@/src/i18n/i18n-react';
import useStyles from '@/src/hooks/useStyles';
import { ApolloError } from '@apollo/client';

export default function ConfirmBookingCreationScreen() {
  const { bookingStartDate, bookingEndDate } = useBookingContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading: roomLoading, room, error: roomError } = useRoom(id);
  const [createBooking, { loading }] = useBooking();
  const [userMessage, setUserMessage] = useState<string | null>('');
  const [bookingTitle, setBookingTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const styles = useStyles();

  const handleSubmit = async () => {
    try {
      await createBooking(
        id,
        [
          new Date(bookingStartDate).getTime(),
          new Date(bookingEndDate).getTime(),
        ],
        bookingTitle.trim() || undefined
      );
      setUserMessage(LL.BOOKING_CREATED());
      setBookingTitle('');
      setTimeout(() => {
        setUserMessage(null);
        router.navigate('/(tabs)/(home)');
      }, 2000);
    } catch (error) {
      if (error instanceof ApolloError) Alert.alert(error.message);
      console.log(error);
    }
  };

  return (
    <QueryResult data={room} loading={roomLoading} error={roomError}>
      <View
        style={[
          styles.flexContainer,
          styles.scrollContainer,
          {
            backgroundColor: colors.backgroundPrimary,
            justifyContent: 'center',
          },
        ]}
      >
        <UserMessage text={userMessage} type="success" />
        {room && (
          <BookingDetailsCard
            roomCode={room.code}
            bookingStartDate={bookingStartDate}
            bookingEndDate={bookingEndDate}
            bookingTitle={bookingTitle}
            setBookingTitle={setBookingTitle}
            error={error}
            onSubmit={handleSubmit}
            buttonText={LL.RESERVE()}
            loading={loading}
          />
        )}
      </View>
    </QueryResult>
  );
}
