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
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';

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
  const dynamicStyles = useStyles();
  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  const { LL } = useI18nContext();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <QueryResult error={error} loading={loading} data={user}>
      <ScrollView
        contentContainerStyle={dynamicStyles.roomViewContentContainer}
        style={[
          dynamicStyles.roomViewContainer,
          { backgroundColor: colors.backgroundPrimary },
        ]}
      >
        <Image
          style={dynamicStyles.roomViewImage}
          source="https://nlr.ru/eng/dep/artupload/eng/article/RA2510/NA19217.jpg"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View>
          <View style={dynamicStyles.roomViewHeaderContainer}>
            <Text
              style={[dynamicStyles.roomCode, { color: colors.textPrimary }]}
            >
              {room.code}
            </Text>
            <Pressable
              style={[
                dynamicStyles.button,
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
                style={[dynamicStyles.buttonText, { color: colors.buttonText }]}
              >
                {LL.RESERVE()}
              </Text>
            </Pressable>
          </View>

          <View style={dynamicStyles.roomLocationContainer}>
            <Entypo name="location-pin" size={24} color={colors.textPrimary} />
            <Text
              style={[
                dynamicStyles.roomLocationText,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              {room.venue.name}
            </Text>
          </View>
          {room.isFree ? (
            <View style={dynamicStyles.roomStatusContainer}>
              <AntDesign name="checksquare" size={20} color={colors.success} />
              <Text
                style={[
                  dynamicStyles.roomStatusText,
                  { color: colors.success },
                ]}
              >
                {LL.AVAILABLE()}
              </Text>
            </View>
          ) : (
            <View style={dynamicStyles.roomStatusContainer}>
              <Entypo name="squared-cross" size={20} color={colors.error} />
              <Text
                style={[dynamicStyles.roomStatusText, { color: colors.error }]}
              >
                {LL.OCCUPIED()}
              </Text>
            </View>
          )}

          <EquipmentList equipment={room.equipment} />
          <RoomDescription text={room.description} />
          <Pressable
            style={[
              dynamicStyles.button,
              {
                backgroundColor: colors.buttonBackground,
                width: '70%',
                alignSelf: 'center',
              },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[dynamicStyles.buttonText, { color: colors.buttonText }]}
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
                dynamicStyles.modalContainer,
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
                  dynamicStyles.button,
                  {
                    backgroundColor: colors.buttonBackground,
                    width: '50%',
                    alignSelf: 'center',
                  },
                ]}
              >
                <Text
                  style={[
                    dynamicStyles.buttonText,
                    { color: colors.buttonText },
                  ]}
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
