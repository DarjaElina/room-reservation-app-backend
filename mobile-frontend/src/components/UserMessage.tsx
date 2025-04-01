import { View, Text } from 'react-native';
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
          backgroundColor: colors.background,
          borderColor: type === 'success' ? colors.success : colors.error,
        },
      ]}
    >
      <Text style={[styles.mediumText, { color: colors.text }]}>{text}</Text>
    </View>
  );
}
