import { View, Text, StyleSheet } from 'react-native';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';

interface UserNotificationProps {
  text: string | null;
  type: 'success' | 'error';
}

export default function UserMessage({ text, type }: UserNotificationProps) {
  const { colors } = useTheme();
  if (!text) {
    return null;
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundPrimary,
          borderColor: type === 'success' ? colors.success : colors.error,
          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.textPrimary }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontWeight: '500',
    fontSize: theme.fontSizes.body,
  },
});
