import { StyleSheet, Pressable, Text } from 'react-native';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';
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
  const { colors } = useTheme();
  const buttonStyles = [
    [
      styles.button,
      {
        backgroundColor: colors.buttonBackground,
      },
    ],
    isBig && styles.bigButton,
    isSmall && styles.smallButton,
    style,
  ];

  return (
    <Pressable style={buttonStyles} onPress={onSubmit}>
      <Text
        style={[
          styles.buttonLabel,
          {
            color: colors.buttonText,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
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
    fontSize: theme.fontSizes.button,
    fontWeight: 'bold',
  },
});
