import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenNames, StackNames } from '@/navigators/routes';
import { useBottomSheet, useForm, usePlatform } from '@/hooks';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthSchema } from '@/schemas';
import { isLoggedSelector } from '@/store/auth/selectors';
import { Keyboard } from 'react-native';
import { showToast } from '@/store/toast';
import { ToastType } from 'types/components';
import { useLazyGetUserQuery } from '@/services/modules/user';
import { useLoginMutation } from '@/services/modules/auth/login';
import { userLoadingSelector } from '@/store/user/selectors';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<ParamListBase>;
  email?: string;
};

const defaultValues = {
  email: '',
  password: '',
};

export default function useLogin({ navigation, email }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['toast']);
  const { handleSubmit, reset, setValue, ...formProps } = useForm({
    defaultValues,
    validationSchema: AuthSchema.login,
  });
  const passwordRecoverySheet = useBottomSheet({
    openSideEffects: () => Keyboard.dismiss(),
  });
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [getUser, { isSuccess: getUserSuccess }] = useLazyGetUserQuery();
  const isLogged = useSelector(isLoggedSelector);
  const isUserLoggedIn = useSelector(userLoadingSelector);
  const { isIOS, isAndroid } = usePlatform();

  useEffect(() => {
    // handling case when user name is passed after registration
    if (email) {
      setValue('email', email);
    }
  }, [email]);

  useEffect(() => {
    // getting user data after login
    isLogged && getUser({})?.refetch();
  }, [isLogged]);

  useEffect(() => {
    if (getUserSuccess) {
      reset();
      navigation.reset({
        index: 0,
        routes: [{ name: StackNames.main }],
      });
    }
  }, [getUserSuccess]);

  const goToRegister = useCallback(
    () => navigation.navigate(ScreenNames.register),
    [],
  );

  const onSuccessSubmit = (values: Record<string, string>) => {
    loginMutation({
      email: values.email,
      password: values.password,
      device_type: isIOS ? 'iphone' : isAndroid ? 'android' : 'other',
    });
  };

  const onErrorSubmit = () =>
    dispatch(
      showToast({
        header: t('toast:login.error.header'),
        message: t('toast:login.error.message'),
        type: ToastType.Error,
      }),
    );

  const onSubmit = useCallback(
    () => handleSubmit(onSuccessSubmit, onErrorSubmit)(),
    [],
  );

  // TODO: Add logic for login with Apple and Google
  const loginWithApple = useCallback(() => console.log('Login: Apple'), []);

  const loginWithGoogle = useCallback(() => console.log('Login: Google'), []);

  return {
    goToRegister,
    passwordRecoverySheet,
    form: {
      onSubmit,
      isLoading: isLoading || isUserLoggedIn,
      ...formProps,
    },
    loginProvider: {
      apple: isIOS && loginWithApple,
      google: isAndroid && loginWithGoogle,
    },
  };
}
