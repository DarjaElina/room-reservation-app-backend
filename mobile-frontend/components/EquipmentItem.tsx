import { View, Text } from 'react-native';

interface EquipmentProp {
  name: string;
}

export default function EquipmentItem({ name }: EquipmentProp) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
