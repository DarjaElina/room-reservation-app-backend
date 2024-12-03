import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import RoomDescription from './RoomDescription';
import theme from '../theme';
import { Image } from 'expo-image';
import EquipmentList from './EquipmentList';
import useAuth from '../hooks/useAuth';
import { Redirect } from 'expo-router';
import BookingList from './BookingList';
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import QueryResult from './QueryResult';
import { BookingStatus } from '@/__generated__/graphql';

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
  const { user, error, loading } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <QueryResult error={error} loading={loading} data={user}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: theme.spacing.large }}
        style={styles.container}
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
            <Text style={styles.headerText}>{room.code}</Text>
            <Link
              href={{
                pathname: '/(home)/rooms/[id]/create-booking',
                params: { id: room.id },
              }}
              asChild
            >
              <Pressable style={styles.reserveButton}>
                <Text style={styles.reserveButtonText}>Reserve</Text>
              </Pressable>
            </Link>
          </View>

          <View style={styles.locationContainer}>
            <Entypo
              name="location-pin"
              size={24}
              color={theme.colors.textPrimary}
            />
            <Text style={styles.locationText}>{room.venue.name}</Text>
          </View>
          {room.isFree ? (
            <View style={styles.statusContainer}>
              <AntDesign
                name="checksquare"
                size={20}
                color={theme.colors.success}
              />
              <Text style={styles.statusText}>Available</Text>
            </View>
          ) : (
            <View style={styles.statusContainer}>
              <Entypo
                name="squared-cross"
                size={20}
                color={theme.colors.error}
              />
              <Text style={[styles.statusText, { color: theme.colors.error }]}>
                Occupied
              </Text>
            </View>
          )}

          <EquipmentList equipment={room.equipment} />
          <RoomDescription text={room.description} />
          <Pressable
            style={styles.showReservationsContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.showReservationsText}>
              Show Upcoming Reservations
            </Text>
          </Pressable>

          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <BookingList
                queryOptions={{
                  roomId: room.id,
                  userId: user.id,
                  status: BookingStatus.Active,
                }}
                emptyMessage="You have no upcoming reservations for this room."
              />

              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
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
    backgroundColor: theme.colors.backgroundPrimary,
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
    color: theme.colors.textPrimary,
  },
  reserveButton: {
    backgroundColor: theme.colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  reserveButtonText: {
    fontSize: theme.fontSizes.button,
    color: theme.colors.buttonText,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
  },
  statusText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.success,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  locationText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.small,
  },
  showReservationsContainer: {
    backgroundColor: theme.colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  showReservationsText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSizes.subheading,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
  },
  closeButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSizes.button,
  },
});
