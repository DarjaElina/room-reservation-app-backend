export const generateUsername = (firstName: string, lastName: string, userNumber: number): string => {
  const firstLetter = firstName.toLowerCase().slice(0, 1);
  const secondLetter = lastName.toLowerCase().slice(0, 1);
  return `${firstLetter}${secondLetter}${userNumber}`;
};