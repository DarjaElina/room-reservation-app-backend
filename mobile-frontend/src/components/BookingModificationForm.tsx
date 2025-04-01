import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import useUpdateBooking from '@/src/hooks/useUpdateBooking';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import UserMessage from './UserMessage';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import { ApolloError } from '@apollo/client';

interface BookingModificationFormProps {
  initialData: {
    title?: string;
    roomId: string;
    startDate: Date;
    endDate: Date;
    id: string;
  };
  onCancel: () => void;
}

const BookingModificationForm: React.FC<BookingModificationFormProps> = ({
  initialData,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData.title);
  const { colors } = useTheme();
  const [updateBooking] = useUpdateBooking();
  const [userMessage, setUserMessage] = useState<string | null>('');
  const { LL } = useI18nContext();
  const styles = useStyles();
  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSave = async () => {
    try {
      await updateBooking(
        initialData.id,
        [
          new Date(initialData.startDate).getTime(),
          new Date(initialData.endDate).getTime(),
        ],
        initialData.roomId,
        title
      );
      setUserMessage(LL.BOOKING_UPDATED_SUCCESSFULLY());
      setTitle('');
      setTimeout(() => {
        setUserMessage(null);
        onCancel();
        router.navigate('/(tabs)/(home)');
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        const message =
          error.graphQLErrors?.[0]?.message || 'Something went wrong!';
        Alert.alert('Error', message);
      }
      console.log(error);
    }
  };

  const handleNavigateToDatePicker = (type: 'start' | 'end') => {
    onCancel();
    router.push({
      pathname: `/(tabs)/(home)/rooms/[id]/modify-booking`,
      params: {
        id: initialData.roomId,
        start: new Date(initialData.startDate).toISOString(),
        end: new Date(initialData.endDate).toISOString(),
        bookingId: initialData.id,
      },
    });
  };

  return (
    <View
      style={[
        styles.itemContainer,

        {
          backgroundColor: colors.background,
          width: '100%',
        },
      ]}
    >
      <UserMessage text={userMessage} type="success" />
      <TextInput
        mode="flat"
        style={[styles.input, { backgroundColor: '#ffffff' }]}
        value={title}
        onChangeText={setTitle}
        placeholder={LL.BOOKING_TITLE()}
        activeUnderlineColor={colors.primary}
      />

      <View style={styles.textContainer}>
        <Text
          style={[styles.mediumText, styles.boldText, styles.textContainer]}
        >
          {LL.STARTS()}:
        </Text>
        <Pressable
          onPress={() => handleNavigateToDatePicker('start')}
          style={styles.datePressable}
        >
          <Text style={styles.mediumText}>
            {formatDate(new Date(initialData.startDate))}
          </Text>
        </Pressable>
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.mediumText,
            styles.boldText,
            styles.textContainer,
            { color: colors.text },
          ]}
        >
          {LL.ENDS()}:
        </Text>
        <Pressable
          onPress={() => handleNavigateToDatePicker('end')}
          style={styles.datePressable}
        >
          <Text style={styles.mediumText}>
            {formatDate(new Date(initialData.endDate))}
          </Text>
        </Pressable>
      </View>

      <View style={styles.flexButtonContainer}>
        <Pressable
          onPress={handleSave}
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Text style={[styles.buttonText]}>{LL.SAVE()}</Text>
        </Pressable>
        <Pressable
          onPress={onCancel}
          style={[styles.button, { backgroundColor: colors.error }]}
        >
          <Text style={[styles.buttonText]}>{LL.CANCEL()}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BookingModificationForm;
