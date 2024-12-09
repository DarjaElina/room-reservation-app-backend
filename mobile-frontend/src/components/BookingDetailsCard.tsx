import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';

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
  const { LL } = useI18nContext();
  const styles = useStyles();

  return (
    <View
      style={[
        styles.bookingDetailsCard,
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
          {LL.BOOKING_DETAILS()}
        </Text>
      </View>
      <Text style={styles.detailText}>
        <Text
          style={[styles.label, { color: colors.textPrimary, fontSize: 20 }]}
        >
          {LL.TITLE()}
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
        placeholder={LL.BOOKING_TITLE()}
        placeholderTextColor={colors.textPrimary}
        activeUnderlineColor={error ? colors.error : colors.inputActiveBorder}
      />
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
      <Text style={[styles.detailText, { color: colors.textPrimary }]}>
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          {LL.ROOM()}:
        </Text>{' '}
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
          {LL.STARTS()}:
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
        <Text style={[styles.label]}>{LL.ENDS()}:</Text>{' '}
        {formatReadableDate(bookingEndDate)}
      </Text>
      <Pressable
        onPress={onSubmit}
        style={[
          styles.button,
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
