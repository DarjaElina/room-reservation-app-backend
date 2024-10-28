import { View, Text } from 'react-native';

export default function TimeSlot({ label, width }) {
  return (
    <View
      style={{
        width,
        height: 100,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: 'grey',
      }}
    >
      {label && <Text>{label}</Text>}
    </View>
  );
}
