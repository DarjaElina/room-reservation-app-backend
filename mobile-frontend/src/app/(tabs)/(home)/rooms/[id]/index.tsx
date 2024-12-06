import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import useRoom from '@/src/hooks/useRoom';
import RoomView from '@/src/components/RoomView';
import QueryResult from '@/src/components/QueryResult';
import { useTheme } from '@react-navigation/native';

export default function RoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading, room, error } = useRoom(id);
  const { colors } = useTheme();

  return (
    <QueryResult loading={loading} error={error} data={room}>
      <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
        <RoomView room={room} />
      </View>
    </QueryResult>
  );
}
