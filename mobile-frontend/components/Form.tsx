import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

//ed10041

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
                activeOutlineColor={error ? 'red' : 'black'}
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
    marginBottom: 15,
  },
  errorText: {
    color: '#EB6424',
    marginTop: 7,
  },
});
