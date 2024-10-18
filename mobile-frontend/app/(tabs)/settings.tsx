import { Text, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import useSignOut from '../../hooks/useSignOut';

export default function SettingsScreen() {
  const { signOut } = useSignOut();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings will be here</Text>
      <Text
        style={styles.text}
        onPress={() => {
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
