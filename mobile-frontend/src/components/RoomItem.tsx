import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { AntDesign, Entypo } from '@expo/vector-icons';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';

interface RoomProps {
  code: string;
  venue: string;
  pictureUrl?: string;
  isFree?: boolean | null;
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Room({
  code,
  venue,
  pictureUrl = 'https://nlr.ru/eng/dep/artupload/eng/article/RA2510/NA19217.jpg',
  isFree,
}: RoomProps) {
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const styles = useStyles();
  return (
    <View
      style={[
        styles.roomItemContainer,
        {
          backgroundColor: colors.backgroundSecondary,
          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
        },
      ]}
    >
      <Image
        style={styles.roomItemImage}
        source={pictureUrl}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Text
        style={[
          styles.roomCode,
          {
            color: colors.textPrimary,
          },
        ]}
      >
        {code}
      </Text>
      <View style={styles.roomLocationContainer}>
        <Entypo
          name="location-pin"
          size={styles.roomCode.fontSize * 1}
          color={colors.textSecondary}
        />
        <Text
          style={[
            styles.roomLocationText,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {venue}
        </Text>
      </View>
      <View style={styles.roomStatusContainer}>
        {isFree ? (
          <>
            <AntDesign
              name="checksquare"
              size={styles.roomCode.fontSize * 0.8}
              color={colors.success}
            />
            <Text style={[styles.roomStatusText, { color: colors.success }]}>
              {LL.AVAILABLE()}
            </Text>
          </>
        ) : (
          <>
            <Entypo
              name="squared-cross"
              size={styles.roomCode.fontSize * 0.6}
              color={colors.error}
            />
            <Text style={[styles.roomStatusText, { color: colors.error }]}>
              {LL.OCCUPIED()}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}
