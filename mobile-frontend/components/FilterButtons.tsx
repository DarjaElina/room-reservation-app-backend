import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import theme from '../theme';
import { router } from 'expo-router';

function FilterButtons() {
  const [value, setValue] = React.useState('');

  console.log('we are filter buttons!');

  return (
    <View style={styles.container}>
      <SegmentedButtons
        density="medium"
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'time',
            label: 'Time',
            icon: () => (
              <Ionicons
                name="time"
                size={20}
                color={
                  value === 'time'
                    ? theme.colors.backgroundPrimary
                    : theme.colors.textPrimary
                }
              />
            ),
            uncheckedColor: theme.colors.textPrimary,
            checkedColor: theme.colors.backgroundPrimary,
            onPress: () => router.navigate('/(home)/time-filter'),
          },
          {
            value: 'building',
            label: 'Building',
            icon: () => (
              <Ionicons
                name="location"
                size={20}
                color={
                  value === 'building'
                    ? theme.colors.backgroundPrimary
                    : theme.colors.textPrimary
                }
              />
            ),
            uncheckedColor: theme.colors.textPrimary,
            checkedColor: theme.colors.backgroundPrimary,
            onPress: () => router.navigate('/(home)/building-filter'),
          },
          {
            value: 'equipment',
            label: 'Equipment',
            icon: () => (
              <FontAwesome5
                name="guitar"
                size={20}
                color={
                  value === 'equipment'
                    ? theme.colors.backgroundPrimary
                    : theme.colors.textPrimary
                }
              />
            ),
            uncheckedColor: theme.colors.textPrimary,
            checkedColor: theme.colors.backgroundPrimary,
            onPress: () => router.navigate('/(home)/equipment-filter'),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default React.memo(FilterButtons);
