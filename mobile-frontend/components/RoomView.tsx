import { View, Text, StyleSheet, Pressable } from 'react-native';
import RoomDescription from './RoomDescription';
import theme from '../theme';
import { Image } from 'expo-image';
import EquipmentList from './EquipmentList';
import Button from './Button';
import useAuth from '../hooks/useAuth';
import { Redirect } from 'expo-router';
import BookingList from './BookingList';
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

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
  const { user } = useAuth();
  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source="https://nlr.ru/eng/dep/artupload/eng/article/RA2510/NA19217.jpg"
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <View style={{ margin: 10, display: 'flex', gap: 5 }}>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{room.code}</Text>

          {room.isFree ? (
            <Text style={{ fontSize: 20 }}>
              <AntDesign name="checksquare" size={24} color="darkgreen" />
              Available
            </Text>
          ) : (
            <Text style={{ fontSize: 20 }}>
              <Entypo name="squared-cross" size={24} color="darkred" />
              Occupied
            </Text>
          )}
        </View>
        <Text style={{ fontSize: 12 }}>{room.venue.name}</Text>
        <EquipmentList equipment={room.equipment} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href={{
              pathname: '/(home)/rooms/[id]/date-time-picker',
              params: { id: room.id },
            }}
            asChild
          >
            <Pressable
              style={{
                width: 100,
                backgroundColor: '#b39ddb',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
            >
              <Text>Reserve</Text>
            </Pressable>
          </Link>
          <Button
            isSmall
            label="Favorite"
            onSubmit={() => console.log('pressed!')}
          />
        </View>
        <RoomDescription text={room.description} />
        <BookingList userId={user.id} roomId={room.id} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textPrimary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 10,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
