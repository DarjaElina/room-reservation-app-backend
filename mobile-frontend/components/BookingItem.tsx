import { View, Text, StyleSheet, Pressable, Alert, Modal } from 'react-native';
import theme from '../theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useCancelBooking from '@/hooks/useCancelBooking';
import BookingModificationForm from './BookingModificationForm';
import { useState } from 'react';

interface BookingItemProps {
  startDate: Date;
  endDate: Date;
  roomCode: string;
  showCode?: boolean;
  title: string;
  id: string;
  roomId: string;
}

export default function BookingItem({
  startDate,
  endDate,
  roomCode,
  title,
  id,
  roomId
}: BookingItemProps) {
  const [cancelBooking] = useCancelBooking();
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);
  const [showModal, setShowModal] = useState(false);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelBooking(id);
      console.log('Booking cancelled successfully!');
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };
  
  const confirmCancel = (id: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          onPress: () => handleCancel(id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.code}>{roomCode}</Text>
      <View style={styles.dateContainer}>
        <FontAwesome name="calendar" size={20} color={theme.colors.textPrimary} />
        <Text style={styles.date}>
          {formattedStartDate.toLocaleString(undefined, options)} -{' '}
          {formattedEndDate.toLocaleString(undefined, options)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => confirmCancel(id)} style={[styles.button, styles.cancelButton]}>
          <MaterialIcons name="delete-forever" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={() => setShowModal(true)} style={[styles.button, styles.modifyButton]}>
          <Entypo name="pencil" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Modify</Text>
        </Pressable>
      <Modal visible={showModal} animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <BookingModificationForm
            initialData={{
              title,
              roomId,
              startDate,
              endDate,
              id
            }}
            onSubmit={(updatedData) => {
              console.log('Updated booking:', updatedData);
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        </View>
      </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.medium,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.colors.shadowOpacity,
    shadowRadius: 4,
    elevation: 3,
    margin: theme.spacing.medium,
    gap: 12,
  },
  code: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.small,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
    marginBottom: theme.spacing.medium,
  },
  date: {
    fontSize: theme.fontSizes.body,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: theme.spacing.large,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    width: '40%',
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
  },
  modifyButton: {
    backgroundColor: theme.colors.success,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontWeight: '600',
    fontSize: theme.fontSizes.button,
    marginLeft: theme.spacing.small,
  },
  title: {
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.small,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: 'center',
  }
});

