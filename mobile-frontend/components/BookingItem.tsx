import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

interface BookingItemProps {
  startDate: Date;
  endDate: Date;
}

export default function BookingItem({ startDate, endDate }: BookingItemProps) {
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {formattedStartDate.toLocaleString(undefined, options)} -{' '}
        {formattedEndDate.toLocaleString(undefined, options)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.medium,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme.colors.shadowOpacity,
    shadowRadius: 3,
    elevation: 2,
    marginHorizontal: theme.spacing.small,
  },
  date: {
    fontSize: theme.fontSizes.body,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
});
