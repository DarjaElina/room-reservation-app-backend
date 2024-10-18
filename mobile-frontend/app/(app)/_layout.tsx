import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../../graphql/queries';

export default function AppLayout() {
  const { loading, error, data } = useQuery(CURRENT_USER);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data?.currentUser) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}
