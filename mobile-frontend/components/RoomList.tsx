import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Room from './RoomItem';
import { Link } from 'expo-router';

export default function RoomList({ rooms }) {
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          padding: 5,
          display: 'flex',
        }}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        data={rooms}
        renderItem={({ item }) => (
          <Link
            style={{ margin: 5 }}
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
    </View>
  );
}
