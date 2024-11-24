import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import useBookingContext from '../../../../../hooks/useBookingContext';
import { useLocalSearchParams } from 'expo-router';
import useRoom from '../../../../../hooks/useRoom';
import useBooking from '../../../../../hooks/useBooking';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import UserMessage from '../../../../../components/UserMessage';
import { router } from 'expo-router';
import theme from '@/theme';

export default function BookingConfirmationScreen() {
  const { bookingStartDate, bookingEndDate } = useBookingContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading: roomLoading, room } = useRoom(id);
  const [createBooking, { loading }] = useBooking();
  const [userMessage, setUserMessage] = useState<string | null>('');

  if (roomLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
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
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.textSecondary} />
        </View>
      )}
      <UserMessage text={userMessage} />
      <View style={styles.card}>
        <View style={styles.header}>
          <FontAwesome5
            name="calendar-check"
            size={24}
            color={theme.colors.textPrimary}
            style={styles.icon}
          />
          <Text style={styles.headerText}>Booking Details</Text>
        </View>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Room:</Text> {room?.code}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Starts:</Text>{' '}
          {formatReadableDate(bookingStartDate)}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Ends:</Text>{' '}
          {formatReadableDate(bookingEndDate)}
        </Text>
        <View style={styles.buttonContainer}>
          <Text onPress={handleSubmit} style={styles.buttonText}>
            Reserve
          </Text>
        </View>
      </View>
    </View>
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
  loadingText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  card: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.large,
    width: '100%',
    maxWidth: 400,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: theme.colors.shadowOpacity,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.medium,
  },
  icon: {
    marginRight: theme.spacing.small,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.heading,
    color: theme.colors.textPrimary,
  },
  detailText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    marginBottom: theme.spacing.small,
  },
  label: {
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    backgroundColor: theme.colors.buttonBackground,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSizes.button,
    fontWeight: 'bold',
  },
});
