import { Text, View, StyleSheet } from 'react-native';
import theme from '../../theme';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My reservation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
