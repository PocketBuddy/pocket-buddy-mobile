import { Button, Form, Input, Paragraph } from '@/components';
import { ButtonType, ParagraphAlign } from 'types/components';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { usePlatform, useTheme } from '@/hooks';
import PasswordRecoverySheet from './PasswordRecoverySheet';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Login({ navigation }: Props) {
  const { t } = useTranslation(['auth']);
  const { Images, Gutters, Layout } = useTheme();
  const { isIOS } = usePlatform();
  const [openPasswordRecovery, setOpenPasswordRecovery] = useState(false);

  const goToRegister = () => navigation.navigate('Register');
  const closePasswordRecovery = useCallback(
    () => setOpenPasswordRecovery(false),
    [],
  );
  const openPasswordRecoverySheet = useCallback(() => {
    Keyboard.dismiss();
    setOpenPasswordRecovery(true);
  }, []);

  return (
    <>
      <Form
        renderInputs={() => (
          <>
            <Input
              label={t('auth:inputs.name.label')}
              placeholder={t('auth:inputs.name.placeholder')}
              onChangeText={() => null}
            />
            <Input
              label={t('auth:inputs.password.label')}
              placeholder={t('auth:inputs.password.placeholder')}
              onChangeText={() => null}
              secured
            />
            <View style={Layout.rowReverse}>
              <TouchableWithoutFeedback onPress={openPasswordRecoverySheet}>
                <View style={Layout.halfWidth}>
                  <Paragraph
                    text={t('auth:inputs.password.message')}
                    align={ParagraphAlign.Right}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </>
        )}
        renderButtons={() => (
          <>
            <Button
              label={t('auth:buttons.login.label')}
              onPress={() => null}
            />
            <View style={[Gutters.tinyPadding, Gutters.smallRowGap]}>
              <TouchableWithoutFeedback onPress={goToRegister}>
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
              </TouchableWithoutFeedback>
              <Paragraph
                text={t('auth:loginMessages.otherLogin')}
                align={ParagraphAlign.Center}
              />
            </View>
            {isIOS ? (
              <Button
                label={t('auth:buttons.signInWith.label', {
                  provider: 'Apple',
                })}
                onPress={() => null}
                icon={Images.icons.apple}
                type={ButtonType.Secondary}
              />
            ) : (
              <Button
                label={t('auth:buttons.signInWith.label', {
                  provider: 'Google',
                })}
                onPress={() => null}
                icon={Images.icons.google}
                type={ButtonType.Secondary}
              />
            )}
          </>
        )}
      />
      <PasswordRecoverySheet
        isOpen={openPasswordRecovery}
        handleClose={closePasswordRecovery}
      />
    </>
  );
}
