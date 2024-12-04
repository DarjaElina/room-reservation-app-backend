import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export interface ColorTheme {
  backgroundPrimary: string;
  backgroundSecondary: string;
  textPrimary: string;
  textSecondary: string;
  buttonBackground: string;
  buttonText: string;
  inputBorder: string;
  inputBackground: string;
  inputActiveBorder: string;
  checkboxActiveBackground: string;
  checkboxInactiveBackground: string;
  checkboxActiveText: string;
  checkboxInactiveText: string;

  success: string;
  error: string;

  shadow: string;
  shadowOpacity: number;
}

export const lightColors: ColorTheme = {
  backgroundPrimary: '#D3E0EA',
  backgroundSecondary: '#F6F5F5',

  textPrimary: '#276678',
  textSecondary: '#1687A7',

  buttonBackground: '#1687A7',
  buttonText: '#F6F5F5',

  inputBorder: '#276678',
  inputBackground: '#F6F5F5',
  inputActiveBorder: '#276678',

  checkboxActiveBackground: '#276678',
  checkboxInactiveBackground: '#F6F5F5',
  checkboxActiveText: '#FFFFFF',
  checkboxInactiveText: '#276678',

  success: 'darkgreen',
  error: 'darkred',

  shadow: '#000000',
  shadowOpacity: 0.2,
};

export const darkColors: ColorTheme = {
  backgroundPrimary: '#121212',
  backgroundSecondary: '#1E1E1E',

  textPrimary: '#D3E0EA',
  textSecondary: '#A0C4D6',

  buttonBackground: '#1687A7',
  buttonText: '#121212',

  inputBorder: '#A0C4D6',
  inputBackground: '#1E1E1E',
  inputActiveBorder: '#D3E0EA',

  checkboxActiveBackground: '#1687A7',
  checkboxInactiveBackground: '#121212',
  checkboxActiveText: '#121212',
  checkboxInactiveText: '#D3E0EA',

  success: 'lightgreen',
  error: 'lightcoral',

  shadow: '#000000',
  shadowOpacity: 0.4,
};

export const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: lightColors.textSecondary,
    background: lightColors.backgroundPrimary,
    card: lightColors.backgroundSecondary,
    text: lightColors.textPrimary,
    border: lightColors.inputBorder,
    notification: lightColors.error,
    ...lightColors,
    shadowOpacity: 0.2,
  },
};

export const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkColors.textSecondary,
    background: darkColors.backgroundPrimary,
    card: darkColors.backgroundSecondary,
    text: darkColors.textPrimary,
    border: darkColors.inputBorder,
    notification: darkColors.error,
    ...darkColors,
    shadowOpacity: 0.6,
  },
};

export type Theme = typeof customDarkTheme | typeof customLightTheme;
