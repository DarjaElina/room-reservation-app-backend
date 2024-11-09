import { View, FlatList } from 'react-native';
import Room from './RoomItem';
import { Link } from 'expo-router';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';

export default function RoomList({ rooms, onEndReach }) {
  const roomNodes = rooms ? rooms.edges.map((edge) => edge.node) : [];
  return (
    <View>
      <SearchBar />
      <FilterButtons />
      <FlatList
        contentContainerStyle={{
          padding: 5,
          display: 'flex',
        }}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        data={roomNodes}
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
