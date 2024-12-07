import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import useUpdateBooking from '@/src/hooks/useUpdateBooking';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import UserMessage from './UserMessage';
import { useI18nContext } from '../i18n/i18n-react';

interface BookingModificationFormProps {
  initialData: {
    title: string;
    roomId: string;
    startDate: Date;
    endDate: Date;
    id: string;
  };
  onSubmit: (updatedData: {
    title: string;
    start: string;
    end: string;
  }) => void;
  onCancel: () => void;
}

const BookingModificationForm: React.FC<BookingModificationFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData.title);
  const { colors } = useTheme();
  const schema = useColorScheme();
  const [updateBooking, {loading}] = useUpdateBooking();
  const [userMessage, setUserMessage] = useState<string | null>('');
  const { LL } = useI18nContext();

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
        new Date(initialData.startDate).getTime(),
        new Date(initialData.endDate).getTime(),
        initialData.roomId,
        title,
      );
      setUserMessage(LL.BOOKING_UPDATED_SUCCESSFULLY());
      setTitle('');
      setTimeout(() => {
        setUserMessage(null);
        router.navigate('/(tabs)/(home)');
      }, 2000);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
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
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary}]}>
      <UserMessage text={userMessage}/>
      <TextInput
        mode="flat"
        style={[styles.input, {backgroundColor: colors.inputBackground}]}
        value={title}
        onChangeText={setTitle}
        placeholder={LL.BOOKING_TITLE()}
        activeUnderlineColor={colors.textPrimary}
        placeholderTextColor={colors.textSecondary}
        textColor={colors.textPrimary}
      />

      <View style={styles.dateContainer}>
        <Text
          style={[
            styles.dateLabel,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          {LL.STARTS()}:
        </Text>
        <Pressable
          onPress={() => handleNavigateToDatePicker('start')}
          style={styles.datePressable}
        >
          <Text style={styles.dateText}>
            {formatDate(new Date(initialData.startDate))}
          </Text>
        </Pressable>
      </View>

      <View style={styles.dateContainer}>
        <Text style={[
            styles.dateLabel,
            {
              color: colors.textPrimary,
            },
          ]}>{LL.ENDS()}:</Text>
        <Pressable
          onPress={() => handleNavigateToDatePicker('end')}
          style={styles.datePressable}
        >
          <Text
            style={styles.dateText}
          >
            {formatDate(new Date(initialData.endDate))}
          </Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleSave}
          style={[
            styles.button,
            {
              backgroundColor: colors.success,
            },
          ]}
        >
          <Text style={[styles.buttonText, {color: schema === 'dark' ? 'black' : 'white'}]}>{LL.SAVE()}</Text>
        </Pressable>
        <Pressable
          onPress={onCancel}
          style={[styles.button, { backgroundColor: colors.error }]}
        >
          <Text style={[styles.buttonText, {color: schema === 'dark' ? 'black' : 'white'}]}>{LL.CANCEL()}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePressable: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButton: {},
  cancelButton: {},
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default BookingModificationForm;
