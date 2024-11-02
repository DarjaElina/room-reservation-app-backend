import { View, Text } from 'react-native';
import { useBookingContext } from '../../../../../hooks/useBookingContext';
import Button from '../../../../../components/Button';
import { useLocalSearchParams } from 'expo-router';
import useRoom from '../../../../../hooks/useRoom';
import useBooking from '../../../../../hooks/useBooking';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// todo
// fix that only adjacent hour and quarter blocks can be selected
// fix that now endDate is 15 min earlier!!!
// implement fetching bookings and mapping them to the calendar
// implement line indicating current time
// implement that times before that line is unselectable if possible?

export default function BookingConfirmationScreen() {
  const { bookingStartDate, bookingEndDate } = useBookingContext();
  const { id } = useLocalSearchParams();
  const { loading, room } = useRoom(id);
  const [createBooking] = useBooking();

  if (loading) {
    return <Text style={{ color: '#fff', fontSize: 18 }}>Loading...</Text>;
  }

  const formatReadableDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmit = async () => {
    try {
      await createBooking(
        id,
        new Date(bookingStartDate).getTime(),
        new Date(bookingEndDate).getTime()
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#340b46',
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          backgroundColor: '#2c0a3b',
          borderRadius: 12,
          padding: 20,
          width: '100%',
          maxWidth: 400,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
      >
        <FontAwesome5 name="calendar-check" size={24} color="white" />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            color: '#e3d5f0',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          Booking Details
        </Text>
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 5 }}>
          <Text style={{ fontWeight: '600', color: '#d9a3ff' }}>Room:</Text>{' '}
          {room?.code}
        </Text>
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 5 }}>
          <Text style={{ fontWeight: '600', color: '#d9a3ff' }}>Starts:</Text>{' '}
          {formatReadableDate(bookingStartDate)}
        </Text>
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 20 }}>
          <Text style={{ fontWeight: '600', color: '#d9a3ff' }}>Ends:</Text>{' '}
          {formatReadableDate(bookingEndDate)}
        </Text>
        <Button
          isSmall
          label="Reserve"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#090623',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}
          textStyle={{ color: '#d9a3ff', fontWeight: '600' }}
        />
      </View>
    </View>
  );
}
