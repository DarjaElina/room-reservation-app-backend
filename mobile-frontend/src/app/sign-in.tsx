import { View, Text } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Form from '@/src/components/Form';
import Button from '@/src/components/Button';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import UserMessage from '../components/UserMessage';
import useSignIn from '@/src/hooks/useSignIn';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';
import { useState } from 'react';

export default function Login() {
  const { colors } = useTheme();
  const { LL } = useI18nContext();
  const [signIn] = useSignIn();
  const userSchema = z.object({
    username: z.string().regex(/^[a-z]{2}\d{5}$/, {
      message: "Username must be in the format 'ab12345'.",
    }),
    password: z.string().min(1, { message: 'Password is required.' }),
  });
  const styles = useStyles();
  const [userMessage, setUserMessage] = useState('');

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setUserMessage(
          error.message || 'An unexpected error occurred. Please try again.'
        );
      } else {
        setUserMessage('An unexpected error occurred. Please try again.');
      }
      setTimeout(() => {
        setUserMessage('');
      }, 5000);
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
      <View>
        <FontAwesome5
          style={styles.userIcon}
          size={50}
          name="user-circle"
          color={colors.textPrimary}
        />
      </View>
      <Text
        style={[
          styles.heading,
          {
            color: colors.textPrimary,
            textAlign: 'center',
          },
        ]}
      >
        {LL.LOGIN()}
      </Text>
      <UserMessage text={userMessage} type="error" />
      <Form
        control={control}
        errors={errors}
        fields={[
          { name: 'username', label: LL.USERNAME() },
          { name: 'password', label: LL.PASSWORD(), isPassword: true },
        ]}
      />
      <Button isBig label={LL.LOGIN()} onSubmit={handleSubmit(onSubmit)} />
    </KeyboardAwareScrollView>
  );
}
