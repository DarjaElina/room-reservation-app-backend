import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

interface UserNotificationProps {
  text: string | null;
}

export default function UserMessage({ text }: UserNotificationProps) {
  if (!text) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderColor: theme.colors.success,
    borderWidth: 1,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.colors.shadowOpacity,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: theme.colors.textPrimary,
    fontWeight: '500',
    fontSize: theme.fontSizes.body,
  },
});
