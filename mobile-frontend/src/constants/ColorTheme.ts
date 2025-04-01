import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export interface ColorTheme {
  background: string;
  card: string;
  text: string;
  border: string;
  primary: string;
  error: string;
  success: string;
}

export const lightColors: ColorTheme = {
  background: 'rgba(245, 250, 255, 1)',
  card: '#ffffff',
  text: 'rgb(21, 26, 31)',
  border: '#71a9f7',
  primary: '#71a9f7',
  error: '#E9192D',
  success: '#3F7D58',
};

export const darkColors: ColorTheme = {
  background: 'rgb(21, 26, 31)',
  card: 'rgb(38, 40, 39)',
  text: 'rgb(245, 245, 245)',
  border: '#71a9f7',
  primary: '#71a9f7',
  error: '#E9192D',
  success: '#3F7D58',
};
export const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: lightColors.primary,
    ...lightColors,
    shadowOpacity: 0.2,
  },
};

export const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    notification: darkColors.error,
    ...darkColors,
    shadowOpacity: 0.6,
  },
};
export type Theme = typeof customDarkTheme | typeof customLightTheme;
