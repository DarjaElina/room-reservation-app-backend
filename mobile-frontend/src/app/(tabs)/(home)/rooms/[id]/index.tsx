import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import useRoom from '@/src/hooks/useRoom';
import RoomView from '@/src/components/RoomView';
import QueryResult from '@/src/components/QueryResult';

export default function RoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading, room, error } = useRoom(id);

  if (!room) {
    return null;
  }

  return (
    <QueryResult loading={loading} error={error} data={room}>
      <View style={{ flex: 1 }}>
        <RoomView room={room} />
      </View>
    </QueryResult>
  );
}
