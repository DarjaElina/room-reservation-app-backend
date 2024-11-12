import { View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import RoomList from '../../../components/RoomList';

// TODO IMPLEMENT QUERY RESULT!!!

export default function Index() {
  return (
    <View style={styles.container}>
      <RoomList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
