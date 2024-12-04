import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import theme from '@/theme';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

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
  const [start, setStart] = useState(initialData.startDate);
  const [end, setEnd] = useState(initialData.endDate);
  const { colors } = useTheme();

  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSave = () => {
    console.log('submitted and modified ehehehehe');
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
    <View style={styles.container}>
      <TextInput
        mode="flat"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Booking title"
        activeUnderlineColor={colors.textPrimary}
      />

      <View style={styles.dateContainer}>
        <Text
          style={[
            ,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          Start Date:
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
        <Text style={styles.dateLabel}>End Date:</Text>
        <Pressable
          onPress={() => handleNavigateToDatePicker('end')}
          style={styles.datePressable}
        >
          <Text
            style={[
              styles.dateText,
              {
                color: colors.textSecondary,
              },
            ]}
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
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable
          onPress={onCancel}
          style={[styles.button, { backgroundColor: colors.error }]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
