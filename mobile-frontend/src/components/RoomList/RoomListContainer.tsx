import { FlatList, useWindowDimensions } from 'react-native';
import Room from '../RoomItem';
import { Link } from 'expo-router';
import useStyles from '@/src/hooks/useStyles';

export default function RoomList({ rooms, onEndReach }) {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const numColumns = width > 768 ? 4 : 2;
  return (
    <FlatList
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.roomListContainer}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      numColumns={numColumns}
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
