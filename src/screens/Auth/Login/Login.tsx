import { Button, ControlledInput, Form, Paragraph } from '@/components';
import { ButtonType, ParagraphAlign } from 'types/components';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { usePlatform, useTheme } from '@/hooks';
import PasswordRecoverySheet from '../PasswordRecoverySheet/PasswordRecoverySheet';
import React from 'react';
import useLogin from './useLogin';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Login({ navigation }: Props) {
  const { t } = useTranslation(['auth']);
  const { Images, Gutters, Layout } = useTheme();
  const { isIOS } = usePlatform();
  const route = useRoute<RouteProp<Record<string, any>>>();
  const { goToRegister, passwordRecoverySheet, form, loginProvider } = useLogin(
    {
      navigation,
      name: route.params?.name,
    },
  );

  return (
    <>
      <Form
        renderInputs={() => (
          <>
            <ControlledInput
              name="name"
              control={form.control}
              label={t('auth:inputs.name.label')}
              placeholder={t('auth:inputs.name.placeholder')}
              errorMessage={form.errors.name?.message}
              textContentType="name"
            />
            <ControlledInput
              name="password"
              control={form.control}
              label={t('auth:inputs.password.label')}
              placeholder={t('auth:inputs.password.placeholder')}
              errorMessage={form.errors.password?.message}
              textContentType="password"
              secured
            />
            <View style={[Layout.rowReverse, Layout.fullWidth]}>
              <View />
              <TouchableOpacity onPress={passwordRecoverySheet.open}>
                <View>
                  <Paragraph
                    text={t('auth:loginMessages.forgotPassword')}
                    align={ParagraphAlign.Right}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderButtons={() => (
          <>
            <Button label={t('auth:buttons.login')} onPress={form.onSubmit} />
            <View style={[Gutters.tinyPadding, Gutters.smallRowGap]}>
              <TouchableOpacity onPress={goToRegister}>
                <View style={[Layout.rowVCenter, Gutters.tinyColumnGap]}>
                  <Paragraph
                    text={t('auth:loginMessages.signUp.question')}
                    align={ParagraphAlign.Center}
                  />
                  <Paragraph
                    text={t('auth:loginMessages.signUp.action')}
                    align={ParagraphAlign.Center}
                    bolded
                  />
                </View>
              </TouchableOpacity>
              <Paragraph
                text={t('auth:loginMessages.otherLogin')}
                align={ParagraphAlign.Center}
              />
            </View>
            {isIOS ? (
              <Button
                label={t('auth:buttons.signInWith', {
                  provider: 'Apple',
                })}
                onPress={loginProvider.apple}
                icon={Images.icons.apple}
                type={ButtonType.Secondary}
              />
            ) : (
              <Button
                label={t('auth:buttons.signInWith', {
                  provider: 'Google',
                })}
                onPress={loginProvider.google}
                icon={Images.icons.google}
                type={ButtonType.Secondary}
              />
            )}
          </>
        )}
      />
      <PasswordRecoverySheet
        isOpen={passwordRecoverySheet.isOpen}
        handleClose={passwordRecoverySheet.close}
      />
    </>
  );
}
