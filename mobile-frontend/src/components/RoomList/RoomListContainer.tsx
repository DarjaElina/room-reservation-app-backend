import { FlatList, Text } from 'react-native';
import RoomItem from '../RoomItem';
import { Link } from 'expo-router';
import useStyles from '@/src/hooks/useStyles';
import { useTheme } from '@react-navigation/native';

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
  const { colors } = useTheme();
  return rooms.length > 0 ? (
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
            testID="room-item-link"
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
  ) : (
    <Text
      style={[
        styles.userMessage,
        {
          color: colors.textPrimary,
        },
      ]}
    >
      No rooms found.
    </Text>
  );
}
