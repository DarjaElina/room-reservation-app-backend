import type { Theme } from '@/constants/ColorTheme';

declare module '@react-navigation/native' {
  export function useTheme(): Theme;
}
