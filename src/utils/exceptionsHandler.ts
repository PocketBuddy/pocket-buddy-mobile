import { Alert } from 'react-native';
import i18next from 'i18next';
import RNRestart from 'react-native-restart';
import { setJSExceptionHandler } from 'react-native-exception-handler';

export default function () {
  setJSExceptionHandler((error, isFatal) => {
    if (isFatal) {
      Alert.alert(
        // @ts-ignore
        i18next.t('toast:exceptionHandler:header'),
        // @ts-ignore
        i18next.t('toast:exceptionHandler:message'),
        [
          {
            // @ts-ignore
            text: i18next.t('toast:exceptionHandler:button'),
            onPress: () => {
              RNRestart.Restart();
            },
          },
        ],
      );
    }
    if (__DEV__) {
      console.log(error);
    }
  }, true);
}
