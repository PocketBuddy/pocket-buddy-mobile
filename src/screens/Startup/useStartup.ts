import { ApplicationScreenProps } from 'types/navigation';
import { isLoggedSelector } from '@/store/auth/selectors';
import { StackNames } from '@/navigators/routes';
import { useEffect } from 'react';
import { useLazyGetUserQuery } from '@/services/modules/user';
import { userLoadingSelector } from '@/store/user/selectors';
import { useSelector } from 'react-redux';

type Props = {
  navigation: ApplicationScreenProps['navigation'];
};

export default function useStartup({ navigation }: Props) {
  const isLogged = useSelector(isLoggedSelector);
  const userLoading = useSelector(userLoadingSelector);
  const [getUser, { isError }] = useLazyGetUserQuery();

  const init = () => {
    if (isLogged) {
      getUser({})?.refetch();
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: StackNames.start }],
    });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!isLogged || userLoading || isError) {
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: StackNames.main }],
    });
  }, [userLoading]);
}
