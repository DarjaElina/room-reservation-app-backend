import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import theme from '@/theme';

export default function BookingDetailsCard({
  roomCode,
  bookingStartDate,
  bookingEndDate,
  bookingTitle,
  setBookingTitle,
  error,
  onSubmit,
  buttonText
}) {
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

  return (
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
        <Text style={[styles.label, { fontSize: 20 }]}>Title:</Text>
      </Text>
      <TextInput
        mode="flat"
        style={styles.input}
        value={bookingTitle}
        onChangeText={setBookingTitle}
        placeholder="Booking title"
        placeholderTextColor={theme.colors.textPrimary}
        activeUnderlineColor={
          error ? theme.colors.error : theme.colors.inputActiveBorder
        }
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={styles.detailText}>
        <Text style={styles.label}>Room:</Text> {roomCode}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Starts:</Text>{' '}
        {formatReadableDate(bookingStartDate)}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.label}>Ends:</Text>{' '}
        {formatReadableDate(bookingEndDate)}
      </Text>
      <Pressable onPress={onSubmit} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    elevation: 5,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
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
  input: {
    backgroundColor: 'transparent',
    color: theme.colors.textPrimary,
    marginBottom: 8,
    height: 30,
    paddingHorizontal: 0,
    paddingVertical: 3,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 16,
  },
});
