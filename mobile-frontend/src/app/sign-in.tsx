import { StyleSheet, View, Text } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Form from '@/src/components/Form';
import Button from '@/src/components/Button';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import theme from '../theme';
import useSignIn from '@/src/hooks/useSignIn';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '@react-navigation/native';

export default function Login() {
  const { colors } = useTheme();
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
      console.log('pressed!');
      await signIn(username, password);
      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        {
          backgroundColor: colors.backgroundPrimary,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <FontAwesome5 name="user-circle" size={50} color={colors.textPrimary} />
      </View>
      <Text
        style={[
          styles.title,
          {
            color: colors.textPrimary,
          },
        ]}
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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.medium,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
  },
});
