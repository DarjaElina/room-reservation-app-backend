import React from 'react';
import { View, Text } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const styles = useStyles();
  return (
    <>
      {fields.map((field) => (
        <View key={field.name} style={styles.input}>
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
                accessibilityLabel={field.label}
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
