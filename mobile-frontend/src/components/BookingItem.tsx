import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  useColorScheme,
} from 'react-native';
import theme from '@/src/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useCancelBooking from '@/src/hooks/useCancelBooking';
import BookingModificationForm from './BookingModificationForm';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';

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
  roomId,
}: BookingItemProps) {
  const [cancelBooking] = useCancelBooking();
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);
  const [showModal, setShowModal] = useState(false);
  const { colors } = useTheme();
  const scheme = useColorScheme();

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  console.log(new Date(startDate) < new Date());

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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundSecondary,
          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.textPrimary,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.code,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {roomCode}
      </Text>
      <View style={styles.dateContainer}>
        <FontAwesome name="calendar" size={20} color={colors.textPrimary} />
        <Text
          style={[
            styles.date,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {formattedStartDate.toLocaleString(undefined, options)} -{' '}
          {formattedEndDate.toLocaleString(undefined, options)}
        </Text>
      </View>
      {new Date(startDate) > new Date() ? (
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => confirmCancel(id)}
            style={[styles.button, { backgroundColor: colors.error }]}
          >
            <MaterialIcons
              name="delete-forever"
              size={24}
              color={scheme === 'light' ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.buttonText,
                {
                  backgroundColor: colors.error,
                  color: colors.buttonText,
                },
              ]}
            >
              Cancel
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setShowModal(true)}
            style={[styles.button, { backgroundColor: colors.success }]}
          >
            <Entypo
              name="pencil"
              size={24}
              color={scheme === 'light' ? 'white' : 'black'}
            />
            <Text
              style={[
                styles.buttonText,
                {
                  backgroundColor: colors.success,
                  color: colors.buttonText,
                },
              ]}
            >
              Modify
            </Text>
          </Pressable>
          <Modal
            visible={showModal}
            animationType="slide"
            onRequestClose={() => setShowModal(false)}
          >
            <View
              style={[
                styles.modalContainer,
                {
                  backgroundColor: colors.backgroundPrimary,
                },
              ]}
            >
              <BookingModificationForm
                initialData={{
                  title,
                  roomId,
                  startDate,
                  endDate,
                  id,
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
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.medium,

    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    margin: theme.spacing.medium,
    gap: 12,
  },
  code: {
    fontSize: theme.fontSizes.medium,
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
  buttonText: {
    fontWeight: '600',
    fontSize: theme.fontSizes.button,
    marginLeft: theme.spacing.small,
  },
  title: {
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: theme.spacing.small,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
