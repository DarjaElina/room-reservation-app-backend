import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import useRoom from '../../../hooks/useRoom';
import RoomView from '../../../components/RoomView';

export default function RoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading, room, error } = useRoom(id);

  if (loading) {
    return <Text>Loading room details...</Text>;
  }

  return <RoomView room={room} />;
}
