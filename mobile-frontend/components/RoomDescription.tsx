import { View, Text } from 'react-native';

interface DescriptionProp {
  text: string;
}

export default function RoomDescription({ text }: DescriptionProp) {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}
