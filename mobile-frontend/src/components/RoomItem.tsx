import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import React from 'react';

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
    <View testID="room-item" style={[styles.itemContainer, { borderWidth: 1 }]}>
      <Image
        style={styles.roomItemImage}
        source={pictureUrl}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Text
        style={[
          styles.bigText,
          styles.boldText,
          {
            color: colors.text,
          },
        ]}
      >
        {code}
      </Text>
      <Text
        style={[
          styles.mediumText,
          {
            color: colors.text,
          },
        ]}
      >
        {venue}
      </Text>
      <View style={styles.iconTextContainer}>
        {isFree ? (
          <>
            <AntDesign
              name="checksquare"
              size={styles.bigText.fontSize * 0.8}
              color={colors.success}
            />
            <Text
              style={[
                styles.mediumText,
                {
                  color: colors.text,
                },
              ]}
            >
              {LL.AVAILABLE()}
            </Text>
          </>
        ) : (
          <>
            <Entypo
              name="squared-cross"
              size={styles.bigText.fontSize * 0.6}
              color={colors.error}
            />
            <Text
              style={[
                styles.mediumText,
                {
                  color: colors.text,
                },
              ]}
            >
              {LL.OCCUPIED()}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}
