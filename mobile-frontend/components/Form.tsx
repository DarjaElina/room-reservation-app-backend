import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import theme from '../theme';
import { useTheme } from '@react-navigation/native';

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
  const { colors } = useTheme();
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
                  error ? colors.error : colors.inputActiveBorder
                }
                style={{
                  backgroundColor: 'transparent',
                  color: colors.textPrimary,
                }}
                placeholderTextColor={colors.textSecondary}
                textColor={colors.textPrimary}
              />
            )}
            name={field.name}
          />
          {errors[field.name] && (
            <Text
              style={[
                styles.errorText,
                {
                  color: colors.error,
                },
              ]}
            >
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
    marginTop: theme.spacing.small,
    fontSize: theme.fontSizes.subheading,
  },
});
