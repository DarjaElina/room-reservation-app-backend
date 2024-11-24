import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import theme from '../theme';

interface FormProps {
  control: Control<any>;
  errors: FieldErrors;
  fields: {
    name: string;
    label: string;
    isPassword?: boolean;
  }[];
}

export default function Form({ control, errors, fields }: FormProps) {
  return (
    <>
      {fields.map((field) => (
        <View key={field.name} style={styles.inputContainer}>
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                mode="flat"
                label={field.label}
                secureTextEntry={field.isPassword}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                activeUnderlineColor={
                  error ? theme.colors.error : theme.colors.inputActiveBorder
                }
                style={{
                  backgroundColor: 'transparent',
                  color: theme.colors.textPrimary,
                }}
                placeholderTextColor={theme.colors.textSecondary}
              />
            )}
            name={field.name}
          />
          {errors[field.name] && (
            <Text style={styles.errorText}>
              {String(errors[field.name]?.message)}
            </Text>
          )}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: theme.spacing.large,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: theme.spacing.small,
    fontSize: theme.fontSizes.subheading,
  },
});
