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
import { useI18nContext } from '../i18n/i18n-react';
import useStyles from '../hooks/useStyles';

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
        <FontAwesome5
          name="user-circle"
          style={styles.userIcon}
          color={colors.textPrimary}
        />
      </View>
      <Text
        style={[
          styles.title,
          {
            color: colors.textPrimary,
            textAlign: 'center',
          },
        ]}
      >
        {LL.LOGIN()}
      </Text>
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
