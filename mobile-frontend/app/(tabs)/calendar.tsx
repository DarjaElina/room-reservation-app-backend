import { Text, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import BookingList from '@/components/BookingList';
import useAuth from '@/hooks/useAuth';
import { BookingStatus } from '@/__generated__/graphql';
import { useTheme } from '@react-navigation/native';

export default function AboutScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundPrimary,
        },
      ]}
    >
      <BookingList
        queryOptions={{ userId: user.id, status: BookingStatus.Active }}
        emptyMessage="You have no upcoming bookings."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
  },
});
