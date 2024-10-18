import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

interface TextProps {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  style?: {};
  children: string;
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.textPrimary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }: TextProps) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'heading' && styles.fontSizeHeading,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
