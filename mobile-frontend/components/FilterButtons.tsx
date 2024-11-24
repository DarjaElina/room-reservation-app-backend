import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import theme from '../theme';
import { router } from 'expo-router';

function FilterButtons() {
  const [value, setValue] = React.useState('');

  return (
    <View style={styles.container}>
      <SegmentedButtons
        density="medium"
        value={value}
        onValueChange={setValue}
        theme={{
          colors: {
            secondaryContainer: theme.colors.buttonBackground,
          },
        }}
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
                    ? theme.colors.buttonText
                    : theme.colors.textPrimary
                }
              />
            ),
            uncheckedColor: theme.colors.textPrimary,
            checkedColor: theme.colors.buttonText,
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
                    ? theme.colors.buttonText
                    : theme.colors.textPrimary
                }
              />
            ),
            uncheckedColor: theme.colors.textPrimary,
            checkedColor: theme.colors.buttonText,
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
                    ? theme.colors.buttonText
                    : theme.colors.textPrimary
                }
              />
            ),
            uncheckedColor: theme.colors.textPrimary,
            checkedColor: theme.colors.buttonText,
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
                    ? theme.colors.buttonText
                    : theme.colors.textPrimary
                }
              />
            ),
            uncheckedColor: theme.colors.textPrimary,
            checkedColor: theme.colors.buttonText,
            onPress: () => router.navigate('/(home)/type-filter'),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.medium,
  },
});

export default React.memo(FilterButtons);
