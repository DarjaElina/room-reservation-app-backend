import { View, Text, Alert } from 'react-native';
import useBookingContext from '../../../../../hooks/useBookingContext';
import Button from '../../../../../components/Button';
import { useLocalSearchParams } from 'expo-router';
import useRoom from '../../../../../hooks/useRoom';
import useBooking from '../../../../../hooks/useBooking';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import UserMessage from '../../../../../components/UserMessage';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';

// todo
// implement user messages for success and error
// implement search bar for classrooms
// make filtering by building, equipment and available time

export default function BookingConfirmationScreen() {
  const { bookingStartDate, bookingEndDate } = useBookingContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading: roomLoading, room } = useRoom(id);
  const [createBooking, { loading }] = useBooking();
  const [userMessage, setUserMessage] = useState<string | null>('');

  if (roomLoading) {
    return <Text style={{ color: '#fff', fontSize: 18 }}>Loading...</Text>;
  }

  const formatReadableDate = (isoDate: string) => {
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
      setUserMessage('Booking created successfully.');
      setTimeout(() => {
        setUserMessage(null);
        router.navigate('/(home)/');
      }, 2000);
    } catch (error) {
      Alert.alert(error.message);
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
      {/* Loading overlay */}
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" color="#d9a3ff" />
        </View>
      )}

      <UserMessage text={userMessage} />

      {/* Booking details container */}
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
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <FontAwesome5
            name="calendar-check"
            size={24}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              color: '#e3d5f0',
            }}
          >
            Booking Details
          </Text>
        </View>
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
