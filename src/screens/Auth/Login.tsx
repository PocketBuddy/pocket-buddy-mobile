import { Alert, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Form, Input, Paragraph } from '@/components';
import { ButtonType, ParagraphAlign } from 'types/components';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Login({ navigation }: Props) {
  const { t } = useTranslation(['auth']);
  const { Images, Gutters, Layout } = useTheme();

  const goToRegister = () => navigation.navigate('Register');

  return (
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
            renderMessage={() => (
              <TouchableWithoutFeedback
                onPress={() =>
                  Alert.alert('Open bottom sheet with recovery password')
                }
              >
                <View>
                  <Paragraph
                    text={t('auth:inputs.password.message')}
                    align={ParagraphAlign.Right}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </>
      )}
      renderButtons={() => (
        <>
          <Button label={t('auth:buttons.login.label')} onPress={() => null} />
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
          <Button
            label={t('auth:buttons.signInWithApple.label')}
            onPress={() => null}
            icon={Images.icons.apple}
            type={ButtonType.Secondary}
          />
        </>
      )}
    />
  );
}
