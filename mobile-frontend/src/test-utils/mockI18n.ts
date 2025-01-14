import { jest } from '@jest/globals';

export const mockLL = {
  AVAILABLE: () => 'Available',
  OCCUPIED: () => 'Occupied',
  CONFIRM: () => 'Confirm',
  CANCEL: () => 'Cancel',
  SEARCH: () => 'Search',
  SAVE: () => 'Save',
};

export const mockUseI18nContext = jest.fn().mockReturnValue({
  LL: mockLL,
});

jest.mock('../i18n/i18n-react', () => ({
  useI18nContext: mockUseI18nContext,
}));
