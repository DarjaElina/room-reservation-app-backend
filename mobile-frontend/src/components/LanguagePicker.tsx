import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';

interface LanguagePickerProps {
  locale: string;
  onLocaleSelected: (locale: string) => void;
  locales: string[];
  colors: {
    text: string;
    background: string;
    border: string;
  };
}

export default function LanguagePicker({ locale, onLocaleSelected, locales }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.pickerContainer]}>
      <Picker
        selectedValue={locale}
        onValueChange={(itemValue) => onLocaleSelected(itemValue)}
        style={[styles.picker, { color: colors.text }]}
        itemStyle={{ color: colors.text }}
      >
        <Picker.Item label="Choose a language" value="" enabled={false} />
        {locales.map((localeOption) => (
          <Picker.Item key={localeOption} label={localeOption} value={localeOption} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: '100%',
    padding: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
  },
});
