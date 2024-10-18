import { Text, View, StyleSheet } from 'react-native';
import useSignOut from '../../hooks/useSignOut';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import theme from '../../theme';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Rooms.....</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
