import { View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import RoomList from '../../../components/RoomList';

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
});
