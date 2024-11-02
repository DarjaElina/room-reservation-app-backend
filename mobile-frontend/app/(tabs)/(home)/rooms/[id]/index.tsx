import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import useRoom from '../../../../../hooks/useRoom';
import RoomView from '../../../../../components/RoomView';
import theme from '../../../../../theme';

export default function RoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading, room, error } = useRoom(id);
  if (loading) {
    return <Text>Loading room details...</Text>;
  }

  if (error) {
    return <Text>Error fetching room details.</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.backgroundPrimary }}>
      <RoomView room={room} />
    </View>
  );
}

//sr10071
//ed10041
