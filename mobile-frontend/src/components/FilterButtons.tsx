import * as React from 'react';
import { View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
function FilterButtons() {
  const { LL } = useI18nContext();
  const [value, setValue] = React.useState('');
  const { colors } = useTheme();
  const styles = useStyles();
  return (
    <View style={styles.segmentedButtons}>
      <SegmentedButtons
        density="medium"
        value={value}
        onValueChange={setValue}
        theme={{
          colors: {
            secondaryContainer: colors.primary,
          },
        }}
        buttons={[
          {
            value: 'time',
            label: LL.TIME(),
            icon: () => (
              <Ionicons
                name="time"
                size={15}
                color={value === 'time' ? colors.background : colors.text}
              />
            ),
            uncheckedColor: colors.text,
            checkedColor: colors.background,
            onPress: () => router.navigate('/(tabs)/(home)/time-filter'),
          },
          {
            value: 'building',
            label: LL.BUILDING(),
            icon: () => (
              <Ionicons
                name="location"
                size={15}
                color={value === 'building' ? colors.background : colors.text}
              />
            ),
            uncheckedColor: colors.text,
            checkedColor: colors.background,
            onPress: () => router.navigate('/(tabs)/(home)/building-filter'),
          },
          {
            value: 'tools',
            label: LL.TOOLS(),
            icon: () => (
              <FontAwesome5
                name="guitar"
                size={15}
                color={value === 'tools' ? colors.background : colors.text}
              />
            ),
            uncheckedColor: colors.text,
            checkedColor: colors.background,
            onPress: () => router.navigate('/(tabs)/(home)/equipment-filter'),
          },
          {
            value: 'type',
            label: LL.TYPE(),
            icon: () => (
              <MaterialIcons
                name="class"
                size={15}
                color={value === 'type' ? colors.background : colors.text}
              />
            ),
            uncheckedColor: colors.text,
            checkedColor: colors.background,
            onPress: () => router.navigate('/(tabs)/(home)/type-filter'),
          },
        ]}
      />
    </View>
  );
}

export default React.memo(FilterButtons);
