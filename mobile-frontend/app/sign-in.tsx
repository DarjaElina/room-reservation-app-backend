import { View, StyleSheet } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import Form from '../components/Form';
import Button from '../components/Button';
import Text from '../components/Text';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { router } from 'expo-router';

export default function Login() {
  const [signIn] = useSignIn();
  const userSchema = z.object({
    username: z.string().regex(/^[a-z]{2}\d{5}$/, {
      message: "Username must be in the format 'ab12345'.",
    }),
    password: z.string().min(1, { message: 'Password is required.' }),
  });

  type UserFormType = z.infer<typeof userSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormType> = async (data: UserFormType) => {
    const { username, password } = data;
    try {
      await signIn(username, password);
      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome5
          name="user-circle"
          size={40}
          color={theme.colors.textSecondary}
        />
      </View>
      <Text
        style={{ textAlign: 'center', marginBottom: 20 }}
        fontSize="heading"
      >
        Log In
      </Text>
      <Form
        control={control}
        errors={errors}
        fields={[
          { name: 'username', label: 'Username' },
          { name: 'password', label: 'Password', isPassword: true },
        ]}
      />
      <Button isBig label="Login" onSubmit={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
