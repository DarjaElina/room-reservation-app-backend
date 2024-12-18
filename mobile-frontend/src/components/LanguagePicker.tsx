import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useStyles from '@/src/hooks/useStyles';
import { Locales } from '../i18n/i18n-types';

interface LanguagePickerProps {
  locale: string;
  onLocaleSelected: (locale: Locales) => void;
  locales: string[];
}

export default function LanguagePicker({ locale, onLocaleSelected, locales }: LanguagePickerProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={[styles.pickerContainer]}>
      <Picker
        selectedValue={locale}
        onValueChange={(itemValue) => onLocaleSelected(itemValue as Locales)}
        style={[
          styles.picker,
        ]}
        itemStyle={{ color: colors.text }}
      >
        <Picker.Item label="Choose a language" value="" enabled={false} />
        {locales.map((localeOption) => (
          <Picker.Item key={localeOption} label={localeOption} value={localeOption} />
        ))}
      </Picker>
    </View>
  );
}

