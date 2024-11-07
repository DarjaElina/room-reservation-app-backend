import { View, FlatList } from 'react-native';
import Room from './RoomItem';
import { Link } from 'expo-router';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';

export default function RoomList({ rooms }) {
  return (
    <View>
      <SearchBar />
      <FilterButtons />
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
