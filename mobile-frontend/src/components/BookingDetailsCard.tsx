import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';

interface BookingDetailsCardProps {
  roomCode?: string | null;
  bookingStartDate: string;
  bookingEndDate: string;
  bookingTitle: string;
  setBookingTitle: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  onSubmit: () => void;
  buttonText: string;
  loading: boolean;
}

export default function BookingDetailsCard({
  roomCode,
  bookingStartDate,
  bookingEndDate,
  bookingTitle,
  setBookingTitle,
  error,
  onSubmit,
  buttonText,
  loading,
}: BookingDetailsCardProps) {
  const { colors } = useTheme();
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
  const { LL } = useI18nContext();
  const styles = useStyles();

  return (
    <View
      style={[
        styles.bookingDetailsCard,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <View style={[styles.iconTextContainer, { margin: 'auto' }]}>
        <FontAwesome5 name="calendar-check" size={24} color={colors.text} />
        <Text
          style={[
            styles.subheading,
            {
              color: colors.text,
            },
          ]}
        >
          {LL.BOOKING_DETAILS()}
        </Text>
      </View>
      <Text>
        <Text style={[styles.mediumText, { color: colors.text }]}>
          {LL.TITLE()}
        </Text>
      </Text>
      <TextInput
        mode="flat"
        style={[
          styles.input,
          {
            color: colors.text,
          },
        ]}
        value={bookingTitle}
        onChangeText={setBookingTitle}
        placeholder={LL.BOOKING_TITLE()}
        activeUnderlineColor={error ? colors.error : colors.primary}
        placeholderTextColor={colors.text}
        textColor={colors.text}
      />
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
      <Text
        style={[
          styles.mediumText,
          styles.textContainer,
          { color: colors.text },
        ]}
      >
        <Text style={[styles.mediumText, { color: colors.text }]}>
          {LL.ROOM()}:
        </Text>{' '}
        {roomCode}
      </Text>
      <Text
        style={[
          styles.mediumText,
          styles.textContainer,
          { color: colors.text },
        ]}
      >
        <Text
          style={{
            color: colors.text,
          }}
        >
          {LL.STARTS()}:
        </Text>{' '}
        {formatReadableDate(bookingStartDate)}
      </Text>
      <Text
        style={[
          styles.mediumText,
          styles.textContainer,
          {
            color: colors.text,
          },
        ]}
      >
        <Text>{LL.ENDS()}:</Text> {formatReadableDate(bookingEndDate)}
      </Text>
      <Pressable
        disabled={loading}
        onPress={onSubmit}
        style={[
          styles.button,
          {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text style={[styles.buttonText]}>{buttonText}</Text>
      </Pressable>
    </View>
  );
}
