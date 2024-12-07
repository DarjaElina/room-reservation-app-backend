import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import RoomDescription from './RoomDescription';
import theme from '@/src/theme';
import { Image } from 'expo-image';
import EquipmentList from './EquipmentList';
import useAuth from '@/src/hooks/useAuth';
import { Redirect } from 'expo-router';
import BookingList from './BookingList';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import QueryResult from './QueryResult';
import { BookingStatus } from '@/__generated__/graphql';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useI18nContext } from '../i18n/i18n-react'

interface RoomProps {
  id: string;
  code: string;
  isFree: boolean;
  name: string;
  description: string;
  equipment: string[];
  venue: {
    name: string;
    id: string;
  };
}

export default function RoomView({ room }: { room: RoomProps }) {
  const { colors } = useTheme();
  const { user, error, loading } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  const { LL } = useI18nContext();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <QueryResult error={error} loading={loading} data={user}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: theme.spacing.large }}
        style={[
          styles.container,
          { backgroundColor: colors.backgroundPrimary },
        ]}
      >
        <Image
          style={styles.image}
          source="https://nlr.ru/eng/dep/artupload/eng/article/RA2510/NA19217.jpg"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View>
          <View style={styles.headerContainer}>
            <Text style={[styles.headerText, { color: colors.textPrimary }]}>
              {room.code}
            </Text>
            <Pressable
              style={[
                styles.reserveButton,
                { backgroundColor: colors.buttonBackground },
              ]}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/(home)/rooms/[id]/create-booking',
                  params: { id: room.id },
                })
              }
            >
              <Text
                style={[styles.reserveButtonText, { color: colors.buttonText }]}
              >
                {LL.RESERVE()}
              </Text>
            </Pressable>
          </View>

          <View style={styles.locationContainer}>
            <Entypo name="location-pin" size={24} color={colors.textPrimary} />
            <Text
              style={[
                styles.locationText,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              {room.venue.name}
            </Text>
          </View>
          {room.isFree ? (
            <View style={styles.statusContainer}>
              <AntDesign name="checksquare" size={20} color={colors.success} />
              <Text style={[styles.statusText, { color: colors.success }]}>
                {LL.AVAILABLE()}
              </Text>
            </View>
          ) : (
            <View style={styles.statusContainer}>
              <Entypo name="squared-cross" size={20} color={colors.error} />
              <Text style={[styles.statusText, { color: colors.error }]}>
                {LL.OCCUPIED()}
              </Text>
            </View>
          )}

          <EquipmentList equipment={room.equipment} />
          <RoomDescription text={room.description} />
          <Pressable
            style={[
              styles.showReservationsContainer,
              { backgroundColor: colors.buttonBackground },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[
                styles.showReservationsText,
                { color: colors.buttonText },
              ]}
            >
              {LL.SHOW_UPCOMING_RESERVATIONS()}
            </Text>
          </Pressable>

          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: colors.backgroundPrimary },
              ]}
            >
              <BookingList
                queryOptions={{
                  roomId: room.id,
                  userId: user.id,
                  status: BookingStatus.Active,
                }}
                emptyMessage={LL.NO_UPCOMING_BOOKINGS()}
              />

              <Pressable
                onPress={() => setModalVisible(false)}
                style={[
                  styles.closeButton,
                  { backgroundColor: colors.buttonBackground },
                ]}
              >
                <Text
                  style={[styles.closeButtonText, { color: colors.buttonText }]}
                >
                  {LL.CLOSE()}
                </Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </QueryResult>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopRightRadius: theme.borderRadius.medium,
    borderTopLeftRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.medium,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.small,
    paddingHorizontal: theme.spacing.small,
  },
  headerText: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
  },
  reserveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  reserveButtonText: {
    fontSize: theme.fontSizes.button,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
  },
  statusText: {
    fontSize: theme.fontSizes.medium,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  locationText: {
    fontSize: theme.fontSizes.body,
    marginLeft: theme.spacing.small,
  },
  showReservationsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  showReservationsText: {
    fontSize: theme.fontSizes.subheading,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  closeButton: {
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: theme.fontSizes.button,
  },
});
