import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
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
                size={15}
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
                size={15}
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
            value: 'tools',
            label: 'Tools',
            icon: () => (
              <FontAwesome5
                name="guitar"
                size={15}
                color={
                  value === 'tools'
                    ? theme.colors.backgroundPrimary
                    : theme.colors.textPrimary
                }
              />
            ),
            uncheckedColor: theme.colors.textPrimary,
            checkedColor: theme.colors.backgroundPrimary,
            onPress: () => router.navigate('/(home)/equipment-filter'),
          },
          {
            value: 'type',
            label: 'Type',
            icon: () => (
              <MaterialIcons
                name="class"
                size={15}
                color={
                  value === 'type'
                    ? theme.colors.backgroundPrimary
                    : theme.colors.textPrimary
                }
              />
            ),
            uncheckedColor: theme.colors.textPrimary,
            checkedColor: theme.colors.backgroundPrimary,
            onPress: () => router.navigate('/(home)/type-filter'),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
});

export default React.memo(FilterButtons);
