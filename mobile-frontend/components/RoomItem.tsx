import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import theme from '../theme';

interface RoomProps {
  code: string;
  venue: string;
  pictureUrl?: string;
  isFree: boolean;
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Room({
  code,
  venue,
  pictureUrl = 'https://nlr.ru/eng/dep/artupload/eng/article/RA2510/NA19217.jpg',
  isFree,
}: RoomProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={pictureUrl}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.title}>{code}</Text>
      <Text>{venue}</Text>
      <Text>{isFree ? 'currently available' : 'occupied'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: theme.colors.textPrimary,
    borderRadius: 10,
    display: 'flex',
    gap: 5,
    marginBottom: 15,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#0553',
  },
  title: {
    fontSize: 25,
  },
});
