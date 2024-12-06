import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';

export default function BookingDetailsCard({
  roomCode,
  bookingStartDate,
  bookingEndDate,
  bookingTitle,
  setBookingTitle,
  error,
  onSubmit,
  buttonText,
}) {
  const { colors } = useTheme();
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
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundSecondary,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={styles.header}>
        <FontAwesome5
          name="calendar-check"
          size={24}
          color={colors.textPrimary}
          style={styles.icon}
        />
        <Text
          style={[
            styles.headerText,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          Booking Details
        </Text>
      </View>
      <Text style={styles.detailText}>
        <Text
          style={[styles.label, { color: colors.textPrimary, fontSize: 20 }]}
        >
          Title:
        </Text>
      </Text>
      <TextInput
        mode="flat"
        style={[
          styles.input,
          {
            color: colors.textPrimary,
          },
        ]}
        value={bookingTitle}
        onChangeText={setBookingTitle}
        placeholder="Booking title"
        placeholderTextColor={colors.textPrimary}
        activeUnderlineColor={error ? colors.error : colors.inputActiveBorder}
      />
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
      <Text style={[styles.detailText, { color: colors.textPrimary }]}>
        <Text style={[styles.label, { color: colors.textPrimary }]}>Room:</Text>{' '}
        {roomCode}
      </Text>
      <Text style={[styles.detailText, { color: colors.textSecondary }]}>
        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Starts:
        </Text>{' '}
        {formatReadableDate(bookingStartDate)}
      </Text>
      <Text
        style={[
          styles.detailText,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        <Text style={[styles.label]}>Ends:</Text>{' '}
        {formatReadableDate(bookingEndDate)}
      </Text>
      <Pressable
        onPress={onSubmit}
        style={[
          styles.buttonContainer,
          {
            backgroundColor: colors.buttonBackground,
          },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: colors.buttonText,
            },
          ]}
        >
          {buttonText}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
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
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.large,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
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
  },
  detailText: {
    fontSize: theme.fontSizes.body,
    marginBottom: theme.spacing.small,
  },
  label: {
    fontWeight: '600',
  },
  buttonContainer: {
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  buttonText: {
    fontSize: theme.fontSizes.button,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'transparent',
    marginBottom: 8,
    height: 30,
    paddingHorizontal: 0,
    paddingVertical: 3,
  },
  errorText: {
    marginBottom: 16,
  },
});
