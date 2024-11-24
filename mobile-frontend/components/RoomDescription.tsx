import theme from '../theme';
import { View, Text, StyleSheet } from 'react-native';

interface DescriptionProp {
  text: string;
}

export default function RoomDescription({ text }: DescriptionProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.medium,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme.colors.shadowOpacity,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    lineHeight: 22,
    textAlign: 'justify',
  },
});
