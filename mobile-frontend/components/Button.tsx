import { StyleSheet, View, Pressable, Text } from 'react-native';
import theme from '../theme';

type Props = {
  label: string;
  onSubmit: () => void;
};

export default function Button({ label, onSubmit }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 30,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.buttons,
  },
  buttonLabel: {
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
});
