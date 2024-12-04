import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import useRoom from '../../../../../hooks/useRoom';
import RoomView from '../../../../../components/RoomView';
import theme from '../../../../../theme';
import QueryResult from '@/components/QueryResult';
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
