import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { SettingsItem } from '@/components';
import { StackNames } from '@/navigators/routes';
import { useLogoutMutation } from '@/services/modules/auth/logout';

export type LogoutProps = {
  title: string;
  navigation: NavigationProp<ParamListBase>;
};

export default function Logout({ title, navigation }: LogoutProps) {
  const [logoutMutation, { isSuccess }] = useLogoutMutation();

  const handleLogout = useCallback(() => {
    logoutMutation({});
  }, [logoutMutation]);

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: StackNames.start }],
      });
    }
  }, [isSuccess]);

  return <SettingsItem title={title} handlePress={handleLogout} />;
}
