import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

interface DescriptionProp {
  text: string;
}

export default function RoomDescription({ text }: DescriptionProp) {
  const { colors } = useTheme();
  const styles = useStyles();
  return (
    <Text
      style={[
        styles.mediumText,
        {
          color: colors.text,
        },
      ]}
    >
      {text}
    </Text>
  );
}
