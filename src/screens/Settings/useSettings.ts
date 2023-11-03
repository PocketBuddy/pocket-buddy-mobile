import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenNames, StackNames } from '@/navigators/routes';
import { useCallback, useEffect } from 'react';
import { useLanguage } from '@/hooks';
import { useLogoutMutation } from '@/services/modules/auth/logout';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export default function useSettings({ navigation }: Props) {
  const [logoutMutation, { isSuccess }] = useLogoutMutation();
  const { newLabel, handleChange } = useLanguage();

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: StackNames.start }],
      });
    }
  }, [isSuccess]);

  const handleLogout = useCallback(() => {
    logoutMutation({});
  }, [logoutMutation]);

  const handleCategories = useCallback(() => {
    navigation.navigate(ScreenNames.manageCategories);
  }, []);

  const handlePriorities = useCallback(() => {
    navigation.navigate(ScreenNames.managePriorities);
  }, []);

  return {
    handleCategories,
    handlePriorities,
    handleLogout,
    language: {
      name: newLabel,
      handleChange,
    },
  };
}
