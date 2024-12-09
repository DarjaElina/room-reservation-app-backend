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
        styles.roomDescriptionContainer,
        {
          backgroundColor: colors.backgroundSecondary,
          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
        },
      ]}
    >
      <Text
        style={[
          styles.roomDescriptionText,
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

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.medium,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: theme.fontSizes.subheading,
    lineHeight: 22,
    textAlign: 'justify',
  },
});
