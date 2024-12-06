import { View, Text, StyleSheet } from 'react-native';

interface SelectedTimeSlotProps {
  value?: string;
  color: string;
}

export default function SelectedTimeSlot({
  value,
  color,
}: SelectedTimeSlotProps) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 25,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    width: '80%',
  },
  text: {
    color: '#fff',
  },
});
