import { StyleSheet, Pressable, Text } from 'react-native';
import theme from '../theme';

type Props = {
  isBig?: boolean;
  isSmall?: boolean;
  label: string;
  onSubmit: () => void;
  style?: {};
};

export default function Button({
  isBig,
  isSmall,
  label,
  onSubmit,
  style,
}: Props) {
  const buttonStyles = [
    styles.button,
    isBig && styles.bigButton,
    isSmall && styles.smallButton,
    style,
  ];

  return (
    <Pressable style={buttonStyles} onPress={onSubmit}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    backgroundColor: theme.colors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  bigButton: {
    width: '100%',
    height: 68,
  },
  smallButton: {
    width: 100,
    height: 35,
  },
  buttonLabel: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSizes.button,
    fontWeight: 'bold',
  },
});
