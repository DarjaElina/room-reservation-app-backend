import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import RoomDescription from './RoomDescription';
import { Image } from 'expo-image';
import EquipmentList from './EquipmentList';
import useAuth from '@/src/hooks/useAuth';
import { Redirect } from 'expo-router';
import BookingList from './BookingList';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import QueryResult from './QueryResult';
import { BookingStatus, RoomType } from '@/__generated__/graphql';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface RoomViewProps {
  __typename?: 'Room';
  id: string;
  isFree?: boolean | null;
  code: string;
  pictureUrl?: string | null;
  isBookable: boolean;
  size: number;
  description: string;
  equipment: Array<{
    __typename?: 'Equipment';
    name: string;
    id: string;
  }>;
  venue: {
    __typename?: 'Venue';
    name: string;
  };
  type: RoomType;
}

export default function RoomView({ room }: { room: RoomViewProps }) {
  const { colors } = useTheme();
  const { user, error, loading } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();
  const formatRoomType = (type: string) => {
    return type
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/^./, (str) => str.toUpperCase());
  };
  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  const { LL } = useI18nContext();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <QueryResult error={error} loading={loading} data={user}>
      <View style={[styles.flexContainer]}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={[{ backgroundColor: colors.backgroundPrimary }]}
        >
          <Image
            style={styles.roomViewImage}
            source="https://nlr.ru/eng/dep/artupload/eng/article/RA2510/NA19217.jpg"
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <View>
            <View style={[styles.headerContainer]}>
              <View
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
              >
                <Text
                  style={[
                    styles.boldText,
                    styles.bigText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {room.code}
                </Text>
                <Text
                  style={[styles.mediumText, { color: colors.textPrimary }]}
                >
                  {formatRoomType(room.type)}
                </Text>
                <View style={styles.iconTextContainer}>
                  <FontAwesome6
                    name="location-dot"
                    size={20}
                    color={colors.textPrimary}
                  />
                  <Text
                    style={[
                      styles.smallText,
                      {
                        color: colors.textPrimary,
                      },
                    ]}
                  >
                    {room.venue.name}
                  </Text>
                </View>
                {room.isFree ? (
                  <View style={styles.iconTextContainer}>
                    <AntDesign
                      name="checksquare"
                      size={20}
                      color={colors.success}
                    />
                    <Text
                      style={[styles.mediumText, { color: colors.success }]}
                    >
                      {LL.AVAILABLE()}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.iconTextContainer}>
                    <Entypo
                      name="squared-cross"
                      size={20}
                      color={colors.error}
                    />
                    <Text style={[styles.mediumText, { color: colors.error }]}>
                      {LL.OCCUPIED()}
                    </Text>
                  </View>
                )}
              </View>

              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: colors.buttonBackground },
                ]}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/(home)/rooms/[id]/create-booking',
                    params: { id: room.id },
                  })
                }
              >
                <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                  {LL.RESERVE()}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.buttonBackground,
                    alignSelf: 'center',
                  },
                ]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                  {LL.SHOW_UPCOMING_RESERVATIONS()}
                </Text>
              </Pressable>
            </View>

            <EquipmentList equipment={room.equipment} />
            <RoomDescription text={room.description} />

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
                    styles.button,
                    {
                      backgroundColor: colors.buttonBackground,
                      width: '50%',
                      alignSelf: 'center',
                    },
                  ]}
                >
                  <Text
                    style={[styles.buttonText, { color: colors.buttonText }]}
                  >
                    {LL.CLOSE()}
                  </Text>
                </Pressable>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    </QueryResult>
  );
}
