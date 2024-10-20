import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Room from './RoomItem';
import { Link } from 'expo-router';


export default function RoomList({ rooms }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/rooms/[id]',
              params: { id: item.id },
            }}
          >
            <Room
              code={item.code}
              venue={item.venue.name}
              isFree={item.isFree}
            />
          </Link>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
