import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScreenWithTabs } from '@/components';
import { SubScreens } from '@/navigators/routes';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Auth({ navigation }: Props) {
  const { login, register } = SubScreens.auth;

  const LoginWithProps = useCallback(
    () => login.component({ navigation }),
    [navigation],
  );

  return (
    <ScreenWithTabs
      screens={[
        {
          ...login,
          component: LoginWithProps,
        },
        { ...register },
      ]}
    />
  );
}
