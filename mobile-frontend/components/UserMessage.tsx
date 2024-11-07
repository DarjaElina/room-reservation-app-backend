import { View, Text, StyleSheet } from 'react-native';

interface UserNotificationProps {
  text: string | null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#155724',
    fontWeight: '500',
    fontSize: 16,
  },
});

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
