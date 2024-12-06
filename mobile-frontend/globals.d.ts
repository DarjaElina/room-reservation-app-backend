import type { Theme } from '@/src/constants/ColorTheme';

declare module '@react-navigation/native' {
  export function useTheme(): Theme;
}
