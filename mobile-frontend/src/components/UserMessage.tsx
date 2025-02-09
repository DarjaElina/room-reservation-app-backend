import { View, Text, StyleSheet } from 'react-native';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

interface UserNotificationProps {
  text: string | null;
  type: 'success' | 'error';
}

export default function UserMessage({ text, type }: UserNotificationProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  if (!text) {
    return null;
  }
  return (
    <View
      style={[
        styles.userMessageContainer,
        {
          backgroundColor: colors.backgroundPrimary,
          borderColor: type === 'success' ? colors.success : colors.error,
          shadowColor: colors.shadow,
          shadowOpacity: colors.shadowOpacity,
        },
      ]}
    >
      <Text style={[styles.mediumText, { color: colors.textPrimary }]}>{text}</Text>
    </View>
  );
}