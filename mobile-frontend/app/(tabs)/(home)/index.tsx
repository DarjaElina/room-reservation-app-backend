import { View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import RoomList from '../../../components/RoomList';
import { useTheme } from '@react-navigation/native';

export default function Index() {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundPrimary,
        },
      ]}
    >
      <RoomList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
