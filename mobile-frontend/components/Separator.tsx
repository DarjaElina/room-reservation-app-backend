import { View } from 'react-native';

export default function Separator() {
  return (
    <View
      style={{
        width: 1,
        position: 'absolute',
        backgroundColor: 'grey',
        left: '20%',
        height: '100%',
      }}
    ></View>
  );
}
