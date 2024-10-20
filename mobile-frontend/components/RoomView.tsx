import { View, Text, StyleSheet } from 'react-native';
import useRoom from '../hooks/useRoom';
import EquipmentItem from './EquipmentItem';
import RoomDescription from './RoomDescription';
import RoomItem from './RoomItem';

export default function RoomView({ room }) {
  return (
    <View>
      <RoomItem code={room.code} venue={room.venue.name} isFree={room.isFree} />
      <RoomDescription text={room.description} />
    </View>
  );
}
