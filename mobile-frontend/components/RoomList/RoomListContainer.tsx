import { View, FlatList, Text, StyleSheet } from 'react-native';
import Room from '../RoomItem';
import { Link } from 'expo-router';

export default function RoomList({ rooms, onEndReach }) {
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      numColumns={2}
      data={rooms}
      renderItem={({ item }) => (
        <Link
          style={styles.roomLink}
          href={{
            pathname: '/rooms/[id]',
            params: { id: item.id },
          }}
        >
          <Room code={item.code} venue={item.venue.name} isFree={item.isFree} />
        </Link>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
    display: 'flex',
  },
  roomLink: {
    margin: 5,
  },
});
