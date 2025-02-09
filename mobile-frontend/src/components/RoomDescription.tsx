import theme from '@/src/theme';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

interface DescriptionProp {
  text: string;
}

export default function RoomDescription({ text }: DescriptionProp) {
  const { colors } = useTheme();
  const styles = useStyles();
  return (
    <View
      style={[
        styles.roomDescriptionContainer
      ]}
    >
      <Text
        style={[
          styles.mediumText,
          {
            color: colors.textPrimary,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}