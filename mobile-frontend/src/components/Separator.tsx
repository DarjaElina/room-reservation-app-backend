import { View } from 'react-native';
import useStyles from '../hooks/useStyles';

export default function Separator() {
  const styles = useStyles();
  return <View style={styles.separator}></View>;
}
