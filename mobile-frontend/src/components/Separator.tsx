import { View, StyleSheet } from 'react-native';

export default function Separator() {
  return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
  separator: {
    width: 1,
    position: 'absolute',
    backgroundColor: 'grey',
    left: '20%',
    height: '100%',
  },
});
