import {
  View,
  Text,
  Pressable,
  Alert,
  Modal,
  useColorScheme,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useCancelBooking from '@/src/hooks/useCancelBooking';
import BookingModificationForm from './BookingModificationForm';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';

interface BookingItemProps {
  startDate: Date;
  endDate: Date;
  roomCode: string;
  showCode?: boolean;
  title?: string;
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
  const { LL } = useI18nContext();
  const styles = useStyles();

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
      LL.CANCEL_BOOKING_TITLE(),
      LL.CANCEL_BOOKING_MESSAGE(),
      [
        {
          text: LL.CANCEL_BOOKING_NO(),
          style: 'cancel',
        },
        {
          text: LL.CANCEL_BOOKING_YES(),
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
        styles.bookingItemContainer,
        {
          backgroundColor: colors.backgroundSecondary,
          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
        },
      ]}
    >
      <Text
        style={[
          styles.bookingTitle,
          {
            color: colors.textPrimary,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.bookingItemCode,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {roomCode}
      </Text>
      <View style={styles.bookingItemDateContainer}>
        <FontAwesome
          name="calendar"
          size={styles.bookingItemDate.fontSize * 1}
          color={colors.textPrimary}
        />
        <Text
          style={[
            styles.bookingItemDate,
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
        <View style={styles.bookingItemButtonContainer}>
          <Pressable
            onPress={() => confirmCancel(id)}
            style={[
              styles.button,
              { backgroundColor: colors.error, flexDirection: 'row' },
            ]}
          >
            <MaterialIcons
              name="delete-forever"
              size={styles.buttonText.fontSize * 1.5}
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
              {LL.CANCEL()}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setShowModal(true)}
            style={[
              styles.button,
              { backgroundColor: colors.success, flexDirection: 'row' },
            ]}
          >
            <Entypo
              name="pencil"
              size={styles.buttonText.fontSize * 1.5}
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
              {LL.MODIFY()}
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
                onCancel={() => setShowModal(false)}
              />
            </View>
          </Modal>
        </View>
      ) : null}
    </View>
  );
}
