import { Text, View } from 'react-native';
import useSignOut from '../../hooks/useSignOut';

export default function Index() {
  const { signOut } = useSignOut();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
