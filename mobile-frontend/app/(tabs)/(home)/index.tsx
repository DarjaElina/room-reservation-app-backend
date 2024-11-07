import { Text, View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import useRooms from '../../../hooks/useRooms';
import RoomList from '../../../components/RoomList';

export default function Index() {
  const { rooms, loading, error } = useRooms();
  if (loading) {
    return <Text>Loading rooms...</Text>;
  }
  return (
    <View style={styles.container}>
      <RoomList rooms={rooms} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
