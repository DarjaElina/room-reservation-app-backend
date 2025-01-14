import { FlatList } from 'react-native';
import RoomItem from '../RoomItem';
import { Link } from 'expo-router';
import useStyles from '@/src/hooks/useStyles';

interface RoomListProps {
  rooms: {
    __typename?: 'Room';
    code: string;
    id: string;
    isFree?: boolean | null;
    pictureUrl?: string | null;
    size: number;
    description: string;
    equipment?: Array<{
      __typename?: 'Equipment';
      name: string;
      id: string;
    } | null> | null;
    venue: {
      __typename?: 'Venue';
      name: string;
    };
  }[];
  onEndReach: ((info: { distanceFromEnd: number }) => void) | null | undefined;
}

export default function RoomListContainer({
  rooms,
  onEndReach,
}: RoomListProps) {
  const styles = useStyles();
  return (
    <FlatList
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.roomListContainer}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      numColumns={2}
      data={rooms}
      renderItem={({ item }) =>
        item ? (
          <Link
            style={styles.roomLink}
            href={{
              pathname: '/rooms/[id]',
              params: { id: item.id },
            }}
          >
            <RoomItem
              code={item.code}
              venue={item.venue.name}
              isFree={item.isFree}
            />
          </Link>
        ) : null
      }
      keyExtractor={(item) => item.id}
    />
  );
}
