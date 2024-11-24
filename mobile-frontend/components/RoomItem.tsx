import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { AntDesign, Entypo } from '@expo/vector-icons'; // Importing icons
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
      <Text style={styles.code}>{code}</Text>
      <View style={styles.locationContainer}>
        <Entypo
          name="location-pin"
          size={18}
          color={theme.colors.textSecondary}
        />
        <Text style={styles.locationText}>{venue}</Text>
      </View>
      <View style={styles.statusContainer}>
        {isFree ? (
          <>
            <AntDesign
              name="checksquare"
              size={16}
              color={theme.colors.success}
            />
            <Text style={[styles.statusText, { color: theme.colors.success }]}>
              Available
            </Text>
          </>
        ) : (
          <>
            <Entypo name="squared-cross" size={16} color={theme.colors.error} />
            <Text style={[styles.statusText, { color: theme.colors.error }]}>
              Occupied
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 170,
    minHeight: 200,
    backgroundColor: theme.colors.backgroundSecondary,
    display: 'flex',
    gap: theme.spacing.small,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOpacity: theme.colors.shadowOpacity,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: theme.borderRadius.medium,
  },
  code: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  locationText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
  statusText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: '600',
  },
});
